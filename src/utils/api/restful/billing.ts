import type { ICheckoutSubscriptionRequest } from '@/components/Pages/Billing/interface';

import { fetchByPOST } from './base';

export const createSubscription = async (data: {
  [key: string]: string | number;
}) => {
  return fetchByPOST('stripe/subscription/create', data);
};

export const getSavedCards = async (data: {
  [key: string]: string | number;
}) => {
  return fetchByPOST('stripe/savedcards/get', data);
};

export const retrieveSubscription = async (email: string) => {
  return fetchByPOST('stripe/subscription/retrieve', { email });
};

export const checkoutSubscription = async (
  data: ICheckoutSubscriptionRequest
) => {
  const host: string = String(process.env.NEXT_PUBLIC_BUYER_VIEW_API_URL);
  return fetchByPOST('buyers/subscription', data, host);
};
