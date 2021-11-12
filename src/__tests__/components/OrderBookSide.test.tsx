import { render, screen } from "@testing-library/react";
import { OrderBookSide } from "components/OrderBookSide";
import { AskOrBidItem } from "types";

const sampleAskItems: AskOrBidItem[] = [
  // price, size, total
  [4000, 1, 1],
  [4200, 1, 2],
];

describe("OrderBookSide", () => {
  it("should render the correct data", () => {
    render(
      <OrderBookSide
        variant="ask"
        expectedItemsCount={12}
        highestTotal={1200}
        items={sampleAskItems}
      />
    );

    expect(screen.getByTestId("price")).toHaveTextContent("PRICE");
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <OrderBookSide
        variant="ask"
        expectedItemsCount={12}
        highestTotal={1200}
        items={sampleAskItems}
      />
    );
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="text-white w-full md:w-1/2"
  >
    <div
      class="md:flex justify-between text2 px-12 flex flex-row"
    >
      <h2
        class="w-24 text-right"
        data-testid="price"
      >
        PRICE
      </h2>
      <h2
        class="w-24 text-right"
      >
        SIZE
      </h2>
      <h2
        class="w-24 text-right"
      >
        TOTAL
      </h2>
    </div>
    <div
      class="relative font-mono"
    >
      <div
        class="absolute opacity-[15%] bg-green-500 h-full flex bg-red-500"
        style="width: 0.08333333333333334%;"
      />
      <div
        class="flex justify-between text1 px-12 flex-row"
      >
        <p
          class="w-24 text-right text-red-500"
        >
          4,000.00
        </p>
        <p
          class="w-24 text-right"
        >
          1
        </p>
        <p
          class="w-24 text-right"
        >
          1
        </p>
      </div>
    </div>
    <div
      class="relative font-mono"
    >
      <div
        class="absolute opacity-[15%] bg-green-500 h-full flex bg-red-500"
        style="width: 0.16666666666666669%;"
      />
      <div
        class="flex justify-between text1 px-12 flex-row"
      >
        <p
          class="w-24 text-right text-red-500"
        >
          4,200.00
        </p>
        <p
          class="w-24 text-right"
        >
          1
        </p>
        <p
          class="w-24 text-right"
        >
          2
        </p>
      </div>
    </div>
  </div>
</DocumentFragment>
`);
  });
});
