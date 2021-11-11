export type AskOrBidItem = [price: number, size: number, total?: number];

export interface OrderBookFeed {
  feed: string;
  product_id: string;
  asks: AskOrBidItem[];
  bids: AskOrBidItem[];
}

export type ProductId = "PI_XBTUSD" | "PI_ETHUSD";
