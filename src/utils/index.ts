import { AskOrBidItem } from "types";

export function formatNumber(number: number, fixedLength: number = 0) {
  if (!number) return 0;
  return number.toLocaleString("en-US", {
    minimumFractionDigits: fixedLength,
    maximumFractionDigits: fixedLength,
  });
}

export function sortByPrice(
  askOrBid: AskOrBidItem[],
  direction: "asc" | "desc"
) {
  return askOrBid.sort((a, b) => {
    return direction === "asc" ? (a[0] > b[0] ? -1 : 1) : a[0] > b[0] ? 1 : -1;
  });
}

export function calculateTotals(
  askOrBid: AskOrBidItem[],
  type: "asks" | "bids"
): AskOrBidItem[] {
  const isAsks = type === "asks";
  let accumulatedTotal = 0;
  return sortByPrice(askOrBid, isAsks ? "desc" : "asc").map((value) => {
    const [price, size] = value;
    accumulatedTotal += size;
    return [price, size, accumulatedTotal];
  });
}
