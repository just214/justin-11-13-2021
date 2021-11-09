import * as React from "react";
import { ProductId, AskOrBidItem } from "types";
import { useThrottle } from "ahooks";

export function useData(initialProductId: ProductId) {
  const [asks, setAsks] = React.useState(null);
  const [bids, setBids] = React.useState(null);
  const [spread, setSpread] = React.useState(null);
  const [highestTotal, setHighestTotal] = React.useState(null);
  const [delta, setDelta] = React.useState(null);
  const [isConnectionClosed, setIsConnectionClosed] = React.useState(false);
  const [productId, setProductId] = React.useState<ProductId>(initialProductId);
  // Keep the websocket in a ref to avoid re-renders
  const ws = React.useRef<WebSocket>(null);
  // Ref responsible for determining if the app has rendered.
  const rendered = React.useRef(false);

  function toggleFeed(newProductId: ProductId) {
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
    askOrBidItems.forEach((item) => {
      // Does this item match an existing item?
      const matchedExistingValue = copyOfExistingAsksOrBids.find(
        (v) => v[0] === item[0]
      );
      if (!matchedExistingValue) {
        // There is no match, so add it on
        copyOfExistingAsksOrBids = [...copyOfExistingAsksOrBids, item];
      } else if (item[1] === 0) {
        // There is a match with a size of 0, so remove it
        copyOfExistingAsksOrBids.filter((v) => v[0] !== item[0]);
      } else {
        // There is a match (not 0), so map over and update the value. Probably not the best performance.
        const matchingIndex = copyOfExistingAsksOrBids.findIndex(
          (v) => v[0] === item[0]
        );
        copyOfExistingAsksOrBids[matchingIndex] = item;
      }
    });

    return copyOfExistingAsksOrBids.filter((v) => v[1] !== 0);
  }

  function startWebSocketConnection() {
    ws.current = new WebSocket("wss://www.cryptofacilities.com/ws/v1");

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: [productId],
        })
      );
    };
    ws.current.onclose = () => console.log("ws closed");

    ws.current.onerror = (e) => console.log("error", e);

    let snapOccurred = false;

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.feed === "book_ui_1_snapshot") {
        snapOccurred = true;
        // Set the asks and bids based on the initial snapshot message
        setAsks(calculateTotals(data.asks, "asks"));
        setBids(calculateTotals(data.bids, "bids"));
      } else {
        // If there are no asks or bids, that means that we haven't gotten the snapshot yet
        if (!snapOccurred) return;
        // Subsequent delta messages
        setDelta(data);
      }
    };
  }

  React.useEffect(() => {
    if (!delta) return;
    function handleUpdates() {
      const mergedAsks = mergeAskOrBidItems(delta.asks, "asks");
      const mergedBids = mergeAskOrBidItems(delta.bids, "bids");
      setAsks(calculateTotals(mergedAsks, "asks"));
      setBids(calculateTotals(mergedBids, "bids"));
    }

    setTimeout(() => {
      handleUpdates();
    }, 500);
  }, [delta]);

  // On initial mount, start the web socket connection
  React.useEffect(() => {
    startWebSocketConnection();
    return () => {
      ws.current.close();
    };
  }, []);

  // Bids or asks changed. Time to recalculate spread and highest total.
  React.useEffect(() => {
    if (!bids || !asks) return;
    const topBid = bids[0];
    const topAsk = asks[0];
    const bottomBid = bids[bids.length - 1];
    const bottomAsk = asks[asks.length - 1];
    const topBidPrice = topBid[0];
    const topAskPrice = topAsk[0];
    const topBidTotal = bottomBid[2];
    const topAskTotal = bottomAsk[2];
    const spread = (topAskPrice - topBidPrice).toFixed(1);
    const highestTotal = Math.max(topBidTotal, topAskTotal);
    setSpread(spread);
    setHighestTotal(highestTotal);
  }, [bids, asks]);

  // This effect is responsible for unsubscribing from previous product ID and
  // subscribing to new product ID any time it changes. (e.g. "PI_XBTUSD" => "PI_ETHUSD")
  React.useEffect(() => {
    // We don't want this effect to run on initial mount because the websocket connection is not yet established.
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    ws.current.send(
      JSON.stringify({
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: [productId],
      })
    );

    // Reset state
    setAsks(null);
    setBids(null);
    setDelta(null);
    setSpread(null);
    setHighestTotal(null);

    ws.current.send(
      JSON.stringify({
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [productId],
      })
    );
  }, [productId]);

  const throttledValues = useThrottle(
    { asks, bids, spread, highestTotal },
    { wait: 500 }
  );

  return {
    // Data
    ...throttledValues,
    productId,
    isConnectionClosed,
    // Functions
    toggleFeed,
    closeConnection,
    openConnection,
  };
}

// Functions

function sortByPrice(askOrBid: AskOrBidItem[], direction: "asc" | "desc") {
  return askOrBid.sort((a, b) => {
    return direction === "asc" ? (a[0] > b[0] ? -1 : 1) : a[0] > b[0] ? 1 : -1;
  });
}

function calculateTotals(
  askOrBid: AskOrBidItem[],
  type: "asks" | "bids"
): AskOrBidItem[] {
  const isAsks = type === "asks";
  let accumulatedTotal = 0;
  return sortByPrice(askOrBid, isAsks ? "desc" : "asc").map((value) => {
    const [price, size] = value;
    accumulatedTotal += size;
    return [price, size, accumulatedTotal];
  });
}
