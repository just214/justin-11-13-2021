import { calculateTotals } from "utils";
import { AskOrBidItem } from "types";

// Using simple values for ease of understanding
const sampleData: AskOrBidItem[] = [
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
];

const expectedBids = [
  [6, 1, 1],
  [5, 1, 2],
  [4, 1, 3],
  [3, 1, 4],
  [2, 1, 5],
  [1, 1, 6],
];

const expectedAsks = [
  [1, 1, 1],
  [2, 1, 2],
  [3, 1, 3],
  [4, 1, 4],
  [5, 1, 5],
  [6, 1, 6],
];

test("Totals get correctly calculated for bid/ask items", () => {
  expect(calculateTotals(sampleData, "asks")).toEqual(expectedAsks);
  expect(calculateTotals(sampleData, "bids")).toEqual(expectedBids);
});
