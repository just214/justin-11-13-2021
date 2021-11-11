import { sortByPrice } from "utils";
import { AskOrBidItem } from "types";

const beforeValues: AskOrBidItem[] = [
  [12, 1, 1],
  [9, 1, 1],
  [12.5, 1, 1],
  [6.5, 1, 1],
  [18.5, 1, 1],
  [15, 1, 1],
];

const expectedDescResult: AskOrBidItem[] = [
  [18.5, 1, 1],
  [15, 1, 1],
  [12.5, 1, 1],
  [12, 1, 1],
  [9, 1, 1],
  [6.5, 1, 1],
];

const expectedAscResult: AskOrBidItem[] = [
  [6.5, 1, 1],
  [9, 1, 1],
  [12, 1, 1],
  [12.5, 1, 1],
  [15, 1, 1],
  [18.5, 1, 1],
];

test("Ask and bids items get sorted correctly by price", () => {
  expect(sortByPrice(beforeValues, "asc")).toEqual(expectedAscResult);
  expect(sortByPrice(beforeValues, "desc")).toEqual(expectedDescResult);
});
