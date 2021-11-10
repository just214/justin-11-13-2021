import * as React from "react";
import { useThrottle } from "ahooks";
import { ErrorBoundary } from "react-error-boundary";

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

const App = () => {
  // Custom Hooks
  const {
    asks,
    bids,
    spread,
    highestTotal,
    switchFeed,
    productId,
    isConnectionClosed,
    closeConnection,
    openConnection,
  } = useData("PI_XBTUSD");
  const isVisible = useDocumentVisibility();

  const throttledData = useThrottle(
    { asks, bids, spread, highestTotal },
    { wait: 500 }
  );

  // Effects
  React.useEffect(() => {
    if (!isVisible) {
      closeConnection();
    }
  }, [isVisible]);

  // Functions
  function restoreConnection() {
    openConnection();
  }

  function handleToggleFeed() {
    switchFeed(productId === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD");
  }

  // Render Component
  return (
    <Layout productId={productId} spread={throttledData.spread}>
      <SEO title="Order Book" description="An order book demo." />
      <Show when={isConnectionClosed}>
        <ConnectionAlert onRequestRestoreConnection={restoreConnection} />
      </Show>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}>
        <Box
          as="span"
          className="flex flex-col-reverse md:flex-row flex-wrap min-h-[450px]">
          <OrderBookSide
            variant="bid"
            items={throttledData.bids}
            highestTotal={throttledData.highestTotal}
          />
          <p className="text2 text-center my-2 block md:hidden">
            Spread {throttledData.spread}
          </p>
          <OrderBookSide
            variant="ask"
            items={throttledData.asks}
            highestTotal={throttledData.highestTotal}
          />
        </Box>
      </ErrorBoundary>

      <Box className="text-center mt-4">
        <Button
          onClick={handleToggleFeed}
          variant="primary"
          disabled={isConnectionClosed}>
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
