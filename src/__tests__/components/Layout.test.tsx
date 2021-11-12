import { render } from "@testing-library/react";
import { Layout } from "components/Layout";

describe("Layout", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Layout spread="123" pair="ETH/USD">
        My App
      </Layout>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col min-h-screen"
        >
          <header
            class="flex justify-center items-center relative text1 surface1 p-4 border-b borderColor"
          >
            <h1
              class="absolute left-4"
              id="orderbook"
            >
              Order Book (ETH/USD)
            </h1>
            <p
              class="text2 hidden md:block"
            >
              Spread 123
            </p>
          </header>
          <main
            class="flex-1"
          >
            <div
              class="p-4"
            >
              My App
            </div>
          </main>
        </div>
      </DocumentFragment>
    `);
  });
});
