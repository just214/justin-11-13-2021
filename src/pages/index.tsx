import * as React from "react";
import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { Box } from "components/Box";

// Hooks
import { useData } from "hooks/useData";
import { useDocumentVisibility } from "hooks/useDocumentVisibility";

// Components
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
    toggleFeed,
    productId,
    isConnectionClosed,
    closeConnection,
    openConnection,
  } = useData("PI_XBTUSD");
  const isVisible = useDocumentVisibility();

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
    toggleFeed(productId === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD");
  }

  // Render Component
  return (
    <Layout spread={spread}>
      <SEO title="Order Book" description="An order book demo." />
      <Show when={isConnectionClosed}>
        <ConnectionAlert onRequestRestoreConnection={restoreConnection} />
      </Show>

      <Box as="span" className="flex flex-col-reverse md:flex-row flex-wrap">
        <OrderBookSide variant="bid" items={bids} highestTotal={highestTotal} />
        <p className="text2 text-center my-2 block md:hidden">
          Spread {spread}
        </p>
        <OrderBookSide variant="ask" items={asks} highestTotal={highestTotal} />
      </Box>

      <Show when={!isConnectionClosed}>
        <Box className="text-center mt-4">
          <Button onClick={handleToggleFeed} variant="primary">
            Toggle Feed ({productId})
          </Button>
        </Box>
      </Show>
    </Layout>
  );
};

export default App;
