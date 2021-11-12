import * as React from "react";
import { ProductId, AskOrBidItem } from "types";
import { calculateTotals } from "utils";

export function useData(initialProductId: ProductId) {
  /******* STATE  ********/
  const [asks, setAsks] = React.useState(null);
  const [bids, setBids] = React.useState(null);
  const [deltaData, setDeltaData] = React.useState(null);
  // Used to handle client updates based on established web socket connection
  const [isConnectionClosed, setIsConnectionClosed] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [productId, setProductId] = React.useState<ProductId>(initialProductId);

  /******* REFS  ********/
  // Keep the websocket in a ref to avoid re-renders
  const ws = React.useRef<WebSocket>(null);
  // Ref responsible for determining if the app has rendered.
  const rendered = React.useRef(false);
  const previousProductId = React.useRef(initialProductId);

  /******* FUNCTIONS  ********/
  function switchFeed(newProductId: ProductId) {
    setProductId(newProductId);
  }

  function closeConnection() {
    setIsConnectionClosed(true);
    ws.current.close();
  }

  function openConnection() {
    setIsConnectionClosed(false);
    startWebSocketConnection();
  }

  function mergeAskOrBidItems(
    askOrBidItems: AskOrBidItem[],
    type: "asks" | "bids"
  ) {
    const isAsks = type === "asks";
    // I know, a mutation...
    let copyOfExistingAsksOrBids = isAsks ? asks : bids;

    // Loop over the delta asks (or bids)
    askOrBidItems.forEach((deltaItem) => {
      // Does this item match an existing item?
      const matchedExistingValue = copyOfExistingAsksOrBids.find(
        (v) => v[0] === deltaItem[0]
      );
      if (!matchedExistingValue && deltaItem[1] !== 0) {
        // There is no match, so add it on
        copyOfExistingAsksOrBids = [...copyOfExistingAsksOrBids, deltaItem];
      } else if (deltaItem[1] === 0) {
        // There is a match with a size of 0, so remove it
        copyOfExistingAsksOrBids.filter((v) => v[0] !== deltaItem[0]);
      } else {
        // There is a match with a size greater than 0, so replace it.
        const matchingIndex = copyOfExistingAsksOrBids.findIndex(
          (v) => v[0] === deltaItem[0]
        );
        copyOfExistingAsksOrBids[matchingIndex] = deltaItem;
      }
    });

    return copyOfExistingAsksOrBids;
  }

  function startWebSocketConnection() {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    ws.current.onopen = () => {
      // Connection established. Reset any past errors.
      setError(null);
      ws.current.send(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: [productId],
        })
      );
    };
    ws.current.onclose = () => console.log("ws closed");

    ws.current.onerror = (e) => {
      setError(e);
    };

    let snapOccurred = false;

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.feed === "book_ui_1_snapshot") {
        snapOccurred = true;
        // Set the asks and bids based on the initial snapshot message
        setAsks(calculateTotals(data.asks, "asks"));
        setBids(calculateTotals(data.bids, "bids"));
      } else {
        if (!snapOccurred) return;
        // Subsequent delta messages
        setDeltaData(data);
      }
    };
  }

  /******* EFFECTS  ********/

  // On initial mount, start the web socket connection
  React.useEffect(() => {
    startWebSocketConnection();
    return () => {
      ws.current.close();
    };
  }, []);

  // This effect is responsible for handling the delta messages as they come in.
  React.useEffect(() => {
    if (!deltaData) return;

    // Abstracted to function for possible refactor later. Web worker, promise perhaps?
    function handleUpdates() {
      if (!asks && !bids) return;
      const mergedAsks = mergeAskOrBidItems(deltaData.asks, "asks");
      const mergedBids = mergeAskOrBidItems(deltaData.bids, "bids");
      setAsks(calculateTotals(mergedAsks, "asks"));
      setBids(calculateTotals(mergedBids, "bids"));
    }

    handleUpdates();
  }, [deltaData]);

  // This effect is responsible for unsubscribing from previous product ID and
  // subscribing to new product ID any time it changes. (e.g. "PI_XBTUSD" => "PI_ETHUSD")
  React.useEffect(() => {
    // We don't want this effect to run on initial mount because the websocket connection is not yet established.
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    if (ws.current.readyState !== 1) return;
    ws.current.send(
      JSON.stringify({
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: [previousProductId.current],
      })
    );

    // Reset state
    setAsks(null);
    setBids(null);
    setDeltaData(null);

    ws.current.send(
      JSON.stringify({
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [productId],
      })
    );

    // Keep track of the previous productId so we can unsubscribe when the product Id changes.
    previousProductId.current = productId;
  }, [productId]);

  return {
    // Data
    asks,
    bids,
    productId,
    isConnectionClosed,
    error,
    // Functions
    switchFeed,
    closeConnection,
    openConnection,
  };
}
