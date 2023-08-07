import qs from 'qs';

import SelectedTab from '@/components/Pages/Billing/Constant/SelectedTab';
import type {
  IBuyersFilterParams,
  IBuyersMarketCityParams,
  IBuyersMarketMsaParams,
} from '@/components/Pages/BuyerView/interface';

import { fetchByGET } from './base';

const host: string = String(process.env.NEXT_PUBLIC_BUYER_VIEW_API_URL);

const formatParams: any = (params: any) => {
  return qs.stringify(params, { encode: true });
};

export const getZipBuyerData = async (params: any) => {
  const buyerFilterParams: IBuyersFilterParams = {
    salesPrice: {
      min: Number(params.salesPriceMin),
      max: Number(params.salesPriceMax),
    },
    salesDate: {
      min: new Date(params.saleDateMin).toISOString(),
      max: new Date(params.saleDateMax).toISOString(),
    },
    beds: {
      min: Number(params.bedsMin),
      max: Number(params.bedsMax),
    },
    baths: {
      min: Number(params.bathsMin),
      max: Number(params.bathsMax),
    },
    search: {
      type: params.zip ? 'zip' : 'address',
      zips: params.zip,
      latitude: params?.coordinates?.lat,
      longitude: params?.coordinates?.lon,
      radius: params?.searchRadius,
      msa: params.msa,
    },
  };

  const url = `buyers?${formatParams(buyerFilterParams)}`;
  return fetchByGET(url, host);
};

export const getMarketSelectBoxData = async (params: {
  selectedTab: string;
  msa: string | null;
}) => {
  // return city
  if (String(params.selectedTab) === String(SelectedTab.RecordingDate)) {
    const url =
      params.msa == null ? 'buyers/cities' : `buyers/cities?msa=${params.msa}`;
    return fetchByGET(url, host);
  }

  return fetchByGET('buyers/msas', host);
};

export const getMarketTransactionListByCity = async (
  msa: string,
  city: string,
  dateMin: string,
  dateMax: string
) => {
  const buyerMarketCityParam: IBuyersMarketCityParams = {
    city,
    msa,
    date: {
      min: new Date(dateMin).toISOString(),
      max: new Date(dateMax).toISOString(),
    },
  };

  const url = `buyers/market/city?${formatParams(buyerMarketCityParam)}`;
  return fetchByGET(url, host);
};

export const getMarketTransactionListByMsa = async (
  msa: string,
  dateMin: string,
  dateMax: string
) => {
  const buyerMarketCityParam: IBuyersMarketMsaParams = {
    msa,
    date: {
      min: new Date(dateMin).toISOString(),
      max: new Date(dateMax).toISOString(),
    },
  };

  const url = `buyers/market/msa?${formatParams(buyerMarketCityParam)}`;
  return fetchByGET(url, host);
};

export const getBuyerTransactionList = async (
  buyer: string,
  msa: string | null
) => {
  const url = msa
    ? `buyers/transactions/${buyer}?msa=${msa}`
    : `buyers/transactions/${buyer}`;

  return fetchByGET(url, host);
};

export const getBuyers = async (data: { msa: string | null }) => {
  const url = data.msa
    ? `buyers/transactions?msa=${data.msa}`
    : 'buyers/transactions';

  return fetchByGET(url, host);
};

export const getZipList = async (msa: string | null) => {
  const url = `buyers/zip-codes?msa=${msa}`;

  return fetchByGET(url, host);
};
