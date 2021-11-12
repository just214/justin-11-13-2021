import * as React from "react";
import { AskOrBidItem } from "types";
import { formatNumber } from "utils";
import { SkeletonLoader } from "components/SkeletonLoader";

export type OrderBookSideProps = {
  // Determines how to render the items (orientation)
  variant: "bid" | "ask";
  // The actual bid or ask items to display
  items?: AskOrBidItem[];
  // Used to calculate the depth graph percentages
  highestTotal: number;
  // Used to determine the number of loading skeleton rows
  expectedItemsCount: number;
};

export const OrderBookSide = (props: OrderBookSideProps) => {
  const isBuySide = props.variant === "bid";

  return (
    <div className="text-white w-full md:w-1/2">
      <div
        className={`md:flex justify-between text2 px-12 ${
          isBuySide ? "hidden flex-row-reverse" : "flex flex-row"
        }`}
      >
        <h2 data-testid="price" className="w-24 text-right">
          PRICE
        </h2>
        <h2 className="w-24 text-right">SIZE</h2>
        <h2 className="w-24 text-right">TOTAL</h2>
      </div>
      {!props.items && (
        <SkeletonLoader
          variant={props.variant}
          rows={props.expectedItemsCount}
        />
      )}

      {props.items?.map((item) => {
        const [price, size, total] = item;
        const depthGraphPercentage = (total / props.highestTotal) * 100;
        return (
          <div className="relative font-mono" key={item[0]}>
            <div
              className={`absolute opacity-[15%] bg-green-500 h-full flex ${
                isBuySide ? "bg-green-500 -right-100 md:right-0" : "bg-red-500"
              }`}
              // This is the secret sauce of updating the width of the corresponding depth graph representation.
              style={{ width: depthGraphPercentage + "%" }}
            />
            <div
              className={`flex justify-between text1 px-12 ${
                isBuySide ? "flex-row md:flex-row-reverse" : "flex-row"
              }`}
            >
              <p
                className={`w-24 text-right ${
                  isBuySide ? "text-green-500" : "text-red-500"
                }`}
              >
                {formatNumber(price, 2)}
              </p>

              <p className="w-24 text-right">{formatNumber(size)}</p>

              <p className="w-24 text-right">{formatNumber(total)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
