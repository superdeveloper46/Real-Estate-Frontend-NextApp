export interface ICheckoutSubscriptionRequest {
  msas: string[];
}

export interface ICheckoutSubscriptionResponse {
  amount_total: number;
  url: string;
}
