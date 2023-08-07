import { fetchByPOST } from './base';

const getPropertyFeatures = (filterOptions: any) => {
  return filterOptions.propertyFeatures.map((item: string) => ({
    terms: { [item]: filterOptions.propertyFeatures },
  }));
};
const getTaxExemptionStatus = (filterOptions: any) => {
  return filterOptions.taxExemptionStatus.map((item: string) => ({
    terms: { [item]: filterOptions.taxExemptionStatus },
  }));
};
const getInterestRatePercent = (filterOptions: any) => {
  if (
    filterOptions.interestRatePercentMax -
      filterOptions.interestRatePercentMin >=
      0 &&
    filterOptions.interestRatePercentMax > 0
  ) {
    return ['mtg1_ir', 'mtg2_ir', 'mtg3_ir', 'mtg4_ir'].map((item: string) => ({
      terms: {
        [item]: {
          gte: filterOptions.interestRatePercentMin,
          lte: filterOptions.interestRatePercentMax,
        },
      },
    }));
  }
  return [];
};
const getInterestRateTypes = (filterOptions: any) => {
  if (filterOptions.interestRateType.length > 0) {
    return [
      'mtg1typefinancing',
      'mtg2typefinancing',
      'mtg3typefinancing',
      'mtg4typefinancing',
    ].map((item: string) => ({
      terms: { [item]: filterOptions.interestRateType },
    }));
  }
  return [];
};

export const getOptions = (filterOptions: any) => {
  const must = [
    // Location
    filterOptions.zipCode && {
      match: { situszip5: `*${filterOptions.zipCode}*` },
    },
    filterOptions.city && { match: { situscity: `*${filterOptions.city}*` } },
    filterOptions.county && { match: { county: `*${filterOptions.county}*` } },
    filterOptions.msa && { match: { msa: `*${filterOptions.msa}*` } },
    filterOptions.schoolDistrict && {
      match: { schooldistrictname: `*${filterOptions.schoolDistrict}*` },
    },

    // Property Characteristics
    filterOptions.propertyClassification && {
      match: {
        property_classification: `*${filterOptions.propertyClassification}*`,
      },
    },
    filterOptions.propertyType && {
      match: { property_type: `*${filterOptions.propertyType}*` },
    },
    filterOptions.bedsMax - filterOptions.bedsMin >= 0 &&
      filterOptions.bedsMax > 0 && {
        range: {
          bedrooms: {
            gte: filterOptions.bedsMin,
            lte: filterOptions.bedsMax,
          },
        },
      },
    filterOptions.bathsMax - filterOptions.bathsMin >= 0 &&
      filterOptions.bathsMax > 0 && {
        range: {
          bathtotalcalc: {
            gte: filterOptions.bathsMin,
            lte: filterOptions.bathsMax,
          },
        },
      },
    filterOptions.buildingSizeMax - filterOptions.buildingSizeMin >= 0 &&
      filterOptions.buildingSizeMax > 0 && {
        range: {
          sumbuildingsqft: {
            gte: filterOptions.buildingSizeMin,
            lte: filterOptions.buildingSizeMax,
          },
        },
      },
    filterOptions.lotSizeMax - filterOptions.lotSizeMin >= 0 &&
      filterOptions.lotSizeMax > 0 && {
        range: {
          lotsizesqft: {
            gte: filterOptions.lotSizeMin,
            lte: filterOptions.lotSizeMax,
          },
        },
      },
    filterOptions.yearBuiltMax - filterOptions.yearBuiltMin >= 0 &&
      filterOptions.yearBuiltMax > 0 && {
        range: {
          yearbuilt: {
            gte: filterOptions.yearBuiltMin,
            lte: filterOptions.yearBuiltMax,
          },
        },
      },
    filterOptions.numberOfStories && {
      match: { num_stories: `*${filterOptions.numberOfStories}*` },
    },
    filterOptions.hasHoa && {
      match: { hoa1name: `*${filterOptions.hasHoa}*` },
    },
    ...getPropertyFeatures(filterOptions),
    filterOptions.unitNumberRangeMax - filterOptions.unitNumberRangeMin >= 0 &&
      filterOptions.unitNumberRangeMax > 0 && {
        range: {
          situsunitnbr: {
            gte: filterOptions.unitNumberRangeMin,
            lte: filterOptions.unitNumberRangeMax,
          },
        },
      },

    // Owner Info & Demographics
    filterOptions.yearsOwnedMax - filterOptions.yearsOwnedMin >= 0 &&
      filterOptions.yearsOwnedMax > 0 && {
        range: {
          years_owned: {
            gte: filterOptions.yearsOwnedMin,
            lte: filterOptions.yearsOwnedMax,
          },
        },
      },
    filterOptions.ownerType && {
      match: { owner_type: `*${filterOptions.ownerType}*` },
    },
    filterOptions.lastSaleDateEnd &&
      filterOptions.lastSaleDateStart && {
        range: {
          sales_date: {
            gte: filterOptions.lastSaleDateStart,
            lte: filterOptions.lastSaleDateEnd,
          },
        },
      },
    filterOptions.lastSalePriceMax - filterOptions.lastSalePriceMin >= 0 &&
      filterOptions.lastSalePriceMax > 0 && {
        range: {
          currentsalesprice: {
            gte: filterOptions.lastSalePriceMin,
            lte: filterOptions.lastSalePriceMax,
          },
        },
      },
    filterOptions.ownerOccupied && {
      match: { owneroccupied: `*${filterOptions.ownerOccupied}*` },
    },
    filterOptions.occupancyStatus && {
      match: { vacantflag: `*${filterOptions.occupancyStatus}*` },
    },
    filterOptions.numberOfPropertiesOwnedMax -
      filterOptions.numberOfPropertiesOwnedMin >=
      0 &&
      filterOptions.numberOfPropertiesOwnedMax > 0 && {
        range: {
          count: {
            gte: filterOptions.numberOfPropertiesOwnedMin,
            lte: filterOptions.numberOfPropertiesOwnedMax,
          },
        },
      },
    ...getTaxExemptionStatus(filterOptions),
    filterOptions.absenteeOwnerLocation && {
      match: {
        absentee_owner_location: `*${filterOptions.absenteeOwnerLocation}*`,
      },
    },
    filterOptions.bankOwned && {
      match: { bank_owned: `*${filterOptions.bankOwned}*` },
    },

    // Valuation & Equity Info
    filterOptions.estimatedValueMax - filterOptions.estimatedValueMin >= 0 &&
      filterOptions.estimatedValueMax > 0 && {
        range: {
          currentavmvalue: {
            gte: filterOptions.estimatedValueMin,
            lte: filterOptions.estimatedValueMax,
          },
        },
      },
    filterOptions.estimatedEquityMax - filterOptions.estimatedEquityMin >= 0 &&
      filterOptions.estimatedEquityMax > 0 && {
        range: {
          equity: {
            gte: filterOptions.estimatedEquityMin,
            lte: filterOptions.estimatedEquityMax,
          },
        },
      },
    filterOptions.assessedTotalValueMax - filterOptions.assessedTotalValueMin >=
      0 &&
      filterOptions.assessedTotalValueMax > 0 && {
        range: {
          assdtotalvalue: {
            gte: filterOptions.assessedTotalValueMin,
            lte: filterOptions.assessedTotalValueMax,
          },
        },
      },

    // Pre-Foreclosure & REOs
    filterOptions.status && {
      match: { pfc_status: `*${filterOptions.status}*` },
    },
    filterOptions.recordingDateEnd &&
      filterOptions.recordingDateStart && {
        range: {
          pfcrecordingdate: {
            gte: filterOptions.recordingDateStart,
            lte: filterOptions.recordingDateEnd,
          },
        },
      },

    // MLS Status
    filterOptions.onMarket && {
      match: { islistedflag: `*${filterOptions.onMarket}*` },
    },
    filterOptions.mlsStatusDateEnd &&
      filterOptions.mlsStatusDateStart && {
        range: {
          listedflagdate: {
            gte: filterOptions.mlsStatusDateStart,
            lte: filterOptions.mlsStatusDateEnd,
          },
        },
      },
    filterOptions.listingAmount && {
      range: {
        islistedpricerange: {
          gte: filterOptions.listingAmount.split('-')[0],
          lte: filterOptions.listingAmount.split('-')[1],
        },
      },
    },

    // Mortgage Info
    filterOptions.loanType && {
      match: {
        loan_type: `*${filterOptions.loanType}*`,
      },
    },
    filterOptions.openMortgagesMax - filterOptions.openMortgagesMin >= 0 &&
      filterOptions.openMortgagesMax > 0 && {
        range: {
          totalopenliennbr: {
            gte: filterOptions.openMortgagesMin,
            lte: filterOptions.openMortgagesMax,
          },
        },
      },
    filterOptions.openLienAmountMax - filterOptions.openLienAmountMin >= 0 &&
      filterOptions.openLienAmountMax > 0 && {
        range: {
          totalopenlienamt: {
            gte: filterOptions.openLienAmountMin,
            lte: filterOptions.openLienAmountMax,
          },
        },
      },
    ...getInterestRatePercent(filterOptions),
    ...getInterestRateTypes(filterOptions),
    filterOptions.cashBuyer && {
      match: { cash_buyer: `*${filterOptions.cashBuyer}*` },
    },
    filterOptions.ownedFreeClear && {
      match: { owned_free_clear: `*${filterOptions.ownedFreeClear}*` },
    },
    filterOptions.sellerCarryBack && {
      match: {
        firstmtgsellercarrybackflag: `*${filterOptions.sellerCarryBack}*`,
      },
    },
  ];
  return must;
};

export const getPropertyListDataFromElasticsearch = async ({
  _source,
  filterOptions,
  from,
  size,
}: {
  _source: Array<string>;
  filterOptions: any;
  from?: number;
  size: number;
}) => {
  const data = {
    _source,
    query: {
      bool: {
        must: getOptions(filterOptions).filter(Boolean),
      },
    },
    size,
    from,
    track_total_hits: true,
  };

  return fetchByPOST('elasticsearch/search/propertylistdata', data);
};

export const editList = async ({
  id,
  listName,
  dmi,
}: {
  id: string;
  listName: string;
  dmi: boolean;
}) => {
  const data = { id, listName, dmi };
  return fetchByPOST('mylist/editlist', data);
};

export const getMyListTotalCount = async ({
  searchKey,
}: {
  searchKey: string;
}) => {
  const data = { searchKey };
  return fetchByPOST('mylist/getlisttotalcount', data);
};

export const deleteMyList = async ({ id }: { id: string }) => {
  const data = { id };
  return fetchByPOST('mylist/deletelist', data);
};

export const getFiltersByListId = async ({ id }: { id: string }) => {
  const data = { id };
  return fetchByPOST('mylist/getfilters', data);
};

export const getParsedLocation = async ({
  searchText,
}: {
  searchText: string;
}) => {
  const data = { searchText };
  return fetchByPOST('elasticsearch/search/getparsedlocation', data);
};
