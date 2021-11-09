import * as React from "react";
import { useThrottle, useThrottleFn } from "ahooks";

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
    <Layout spread={throttledData.spread}>
      <SEO title="Order Book" description="An order book demo." />
      <Show when={isConnectionClosed}>
        <ConnectionAlert onRequestRestoreConnection={restoreConnection} />
      </Show>

      <Box as="span" className="flex flex-col-reverse md:flex-row flex-wrap">
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

      <Box className="text-center mt-4">
        <Button
          onClick={handleToggleFeed}
          variant="primary"
          disabled={isConnectionClosed}>
          Toggle Feed ({productId})
        </Button>
      </Box>
    </Layout>
  );
};

export default App;
