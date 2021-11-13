import * as React from "react";
import { useThrottleFn } from "ahooks";
import { ErrorBoundary } from "react-error-boundary";
import { useWindowSize } from "@reach/window-size";

// Hooks
import { useData } from "hooks/useData";
import { useDocumentVisibility } from "hooks/useDocumentVisibility";

// Components
import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { Box } from "components/Box";
import { OrderBookSide } from "components/OrderBookSide";
import { ConnectionAlert } from "components/ConnectionAlert";
import { Show } from "components/Show";
import { Button } from "components/Button";
import { ErrorAlert } from "components/ErrorAlert";

const App = () => {
  // Custom Hooks
  const {
    asks,
    bids,
    switchFeed,
    productId,
    isConnectionClosed,
    error,
    closeConnection,
    openConnection,
  } = useData("PI_XBTUSD");
  const isVisible = useDocumentVisibility();

  const { height, width } = useWindowSize();
  const [throttledData, setThrottledData] = React.useState(null);

  // Calculate the amount of items based on the height of the window.
  // (Each row is approximately 24px high)
  const itemsToDisplay =
    width < 768 ? Math.floor(height / 65) : Math.floor(height / 30);

  /* 
  This function is used for the following:
  1. Slice the asks/bids dynamically based on the window size
  2. Calculate the spread and highest total (for depth graph) based on the 
    actual number of bid/asks items to display. (not sure if this is right, but my best guess 🤷🏻‍♂️)
  3. Throttle all of the values by 500ms to get some smooth UI rendering.
  */

  const handleThrottleAndSlicing = useThrottleFn(
    () => {
      if (!bids || !asks) return;
      const displayedAsks = asks?.slice(0, itemsToDisplay);
      const displayedBids = bids?.slice(0, itemsToDisplay);
      // Remember, bids are sorted with the highest price on top.
      // Asks are sorted with the lowest price at the top;
      const topBid = displayedBids[0];
      const topAsk = displayedAsks[0];
      const bottomBid = displayedBids[displayedBids.length - 1];
      const bottomAsk = displayedAsks[displayedAsks.length - 1];
      const topBidPrice = topBid[0];
      const topAskPrice = topAsk[0];
      const topBidTotal = bottomBid[2];
      const topAskTotal = bottomAsk[2];
      const spread = (topAskPrice - topBidPrice).toFixed(1);
      const highestTotal = Math.max(topBidTotal, topAskTotal);
      setThrottledData({
        asks: displayedAsks,
        bids: displayedBids,
        spread,
        highestTotal,
      });
    },
    { wait: 500 }
  );

  React.useEffect(() => {
    handleThrottleAndSlicing.run();
  }, [asks, bids, itemsToDisplay, handleThrottleAndSlicing]);

  // Effects
  React.useEffect(() => {
    if (!isVisible) {
      closeConnection();
    }
  }, [isVisible, closeConnection]);

  // Functions
  function restoreConnection() {
    openConnection();
  }

  function handleToggleFeed() {
    const newProductId = productId === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD";
    switchFeed(newProductId);
  }

  const pair = productId === "PI_XBTUSD" ? "BTC/USD" : "ETH/USD";

  // Render Component
  return (
    <Layout spread={throttledData?.spread} pair={pair}>
      <SEO
        title={`Order Book`}
        pair={pair}
        description="An order book demo for BTC/USD and ETH/USD pairings."
        url="https://justin-11-10-2021.vercel.app/"
        icon="apple-touch-icon.png"
      />
      <Show when={isConnectionClosed}>
        <ConnectionAlert onRequestRestoreConnection={restoreConnection} />
      </Show>

      <Show when={error !== null}>
        <ErrorAlert />
      </Show>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Box
          as="div"
          className="flex flex-col-reverse md:flex-row flex-wrap w-full min-h-[80vh]"
        >
          <OrderBookSide
            variant="bid"
            expectedItemsCount={itemsToDisplay}
            items={throttledData?.bids}
            highestTotal={throttledData?.highestTotal}
          />
          <p className="text2 text-center my-2 block md:hidden">
            Spread {throttledData?.spread}
          </p>
          <OrderBookSide
            variant="ask"
            expectedItemsCount={itemsToDisplay}
            items={throttledData?.asks}
            highestTotal={throttledData?.highestTotal}
          />
        </Box>
      </ErrorBoundary>

      <Box className="text-center mt-4">
        <Button
          onClick={handleToggleFeed}
          variant="primary"
          disabled={isConnectionClosed}
        >
          Toggle Feed
        </Button>
      </Box>
    </Layout>
  );
};

export default App;

// Fallback for error boundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
