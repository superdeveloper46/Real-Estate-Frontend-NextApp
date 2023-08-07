export interface IBuyersFilterParams {
  salesPrice: {
    min: number;
    max: number;
  };
  salesDate: {
    min: string;
    max: string;
  };
  beds: {
    min: number;
    max: number;
  };
  baths: {
    min: number;
    max: number;
  };
  search: {
    type: string;
    zips: string[];
    latitude?: number;
    longitude?: number;
    radius?: number;
    msa: string;
  };
}

export interface IBuyersMarketMsaParams {
  msa: string;
  date: {
    min: string;
    max: string;
  };
}

export interface IBuyersMarketCityParams {
  city: string;
  msa: string;
  date: {
    min: string;
    max: string;
  };
}

export interface IBuyerViewData {
  BUYER_BORROWER1_NAME: string;
  'COUNT(*)': number;
}

export interface IBuyerViewDetailData {
  RECORDING_DATE: string;
  BUYER_BORROWER1_NAME: string;
  FIRST_MTG_LENDER_NAME: string;
  BUYER_BORROWER1_CORP_IND: string;
  BUYER_BORROWER1_OWNERSHIP_RIGHTS_CODE: string;
  FULL_STREET_ADDRESS: string;
  CITY: string;
  ZIP_CODE: string;
  SUM_BUILDING_SQFT: number;
  YEAR_BUILT: string;
  CURRENT_AVM_VALUE: number;
  SALE_AMT: string;
  SALE_DATE: string;
  SELLER1_NAME: string;
  LENDER: string;
  LATITUDE: number;
  LONGITUDE: number;
  CORP_FLAG: number;
  DISC_PURCHASE: number;
  CASH_BUYER: number;
  PRIVATE_LENDER: number;
  BEDROOMS: number;
  BATHROOMS: number;
}

export interface IBuyerMarketTransactionData {
  RECORDING_DATE: string;
  BUYER_NAME: string;
  LOAN_AMT: number;
  MSA: string;
  ADDRESS: string;
  CITY: string;
  ZIP_CODE: string;
  SQFT: number;
  YEAR_BUILT: string;
  ESTIMATED_VALUE: number;
  SALE_DATE: string;
  SELLER_NAME: string;
  BEDROOMS: number;
  BATHROOMS: number;
  PROPERTY_TYPE: string;
  CORPORATE_PURCHASE: number;
  DISCOUNTED_PURCHASE: number;
  CASH_BUYER: number;
  PRIVATE_LENDER_USED: number;
  LATITUDE: number;
  LONGITUDE: number;
  SALE_AMT: string;
}
