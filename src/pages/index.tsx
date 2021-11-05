import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { Emoji } from "components/Emoji";
import { Box } from "components/Box";

const App = () => {
  return (
    <Layout>
      <SEO title="Order Book" description="An order book demo." />
      <Box as="span" className="flex gap-2">
        Let's do this!
      </Box>
    </Layout>
  );
};

export default App;
