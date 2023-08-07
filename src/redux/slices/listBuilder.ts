import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle

type DataType = {
  [key: string]: any;
};

const initialState: DataType = {
  toggleFilters: true,
  viewType: 1,
  tablePageIndex: 1,
  mapType: false,
  mapRef: null,
  mapZoom: 4,
  longitude: -100.0,
  latitude: 40.0,
  openFilterDialog: -1,
  filters: {
    locationFilters: {
      zipCode: '',
      city: '',
      county: '',
      msa: '',
      schoolDistrict: '',
      filterCount: 0,
    },
    propertyCharcFilters: {
      propertyClassification: '',
      propertyType: '',
      bedsMin: 0,
      bedsMax: 0,
      bathsMin: 0,
      bathsMax: 0,
      buildingSizeMin: 0,
      buildingSizeMax: 0,
      lotSizeMin: 0,
      lotSizeMax: 0,
      yearBuiltMin: 0,
      yearBuiltMax: 0,
      numberOfStories: '',
      hasHoa: '',
      propertyFeatures: [],
      unitNumberRangeMin: 0,
      unitNumberRangeMax: 0,
    },
    ownerInfoDgFilters: {
      yearsOwnedMin: 0,
      yearsOwnedMax: 0,
      yearsOwnedInclude: true,
      ownerType: '',
      lastSaleDateStart: '',
      lastSaleDateEnd: '',
      lastSaleDateInclude: false,
      lastSalePriceMin: 0,
      lastSalePriceMax: 0,
      lastSalePriceInclude: false,
      ownerOccupied: '',
      occupancyStatus: '',
      numberOfPropertiesOwnedMin: 0,
      numberOfPropertiesOwnedMax: 0,
      numberOfPropertiesOwnedInclude: true,
      taxExemptionStatus: [],
      absenteeOwnerLocation: '',
      bankOwned: '',
    },
    valuationEquityInfoFilters: {
      estimatedValueMin: 0,
      estimatedValueMax: 0,
      estimatedEquityMin: 0,
      estimatedEquityMax: 0,
      assessedTotalValueMin: 0,
      assessedTotalValueMax: 0,
    },
    preForeclosureRepsFilters: {
      status: '',
      recordingDateStart: '',
      recordingDateEnd: '',
    },
    mlsStatusFilters: {
      onMarket: '',
      mlsStatusDateStart: '',
      mlsStatusDateEnd: '',
      listingAmount: '',
    },
    mortgageInfoFilters: {
      loanType: '',
      openMortgagesMin: 0,
      openMortgagesMax: 0,
      openLienAmountMin: 0,
      openLienAmountMax: 0,
      interestRatePercentMin: 0,
      interestRatePercentMax: 0,
      interestRateType: '',
      cashBuyer: '',
      ownedFreeClear: '',
      sellerCarryBack: '',
    },
    preBuiltFilters: {},
  },
  realFilters: {
    locationFilters: {
      zipCode: '',
      city: '',
      county: '',
      msa: '',
      schoolDistrict: '',
    },
    propertyCharcFilters: {
      propertyClassification: '',
      propertyType: '',
      bedsMin: 0,
      bedsMax: 0,
      bathsMin: 0,
      bathsMax: 0,
      buildingSizeMin: 0,
      buildingSizeMax: 0,
      lotSizeMin: 0,
      lotSizeMax: 0,
      yearBuiltMin: 0,
      yearBuiltMax: 0,
      numberOfStories: '',
      hasHoa: '',
      propertyFeatures: [],
      unitNumberRangeMin: 0,
      unitNumberRangeMax: 0,
    },
    ownerInfoDgFilters: {
      yearsOwnedMin: 0,
      yearsOwnedMax: 0,
      yearsOwnedInclude: true,
      ownerType: '',
      lastSaleDateStart: '',
      lastSaleDateEnd: '',
      lastSaleDateInclude: false,
      lastSalePriceMin: 0,
      lastSalePriceMax: 0,
      lastSalePriceInclude: false,
      ownerOccupied: '',
      occupancyStatus: '',
      numberOfPropertiesOwnedMin: 0,
      numberOfPropertiesOwnedMax: 0,
      numberOfPropertiesOwnedInclude: true,
      taxExemptionStatus: [],
      absenteeOwnerLocation: '',
      bankOwned: '',
    },
    valuationEquityInfoFilters: {
      estimatedValueMin: 0,
      estimatedValueMax: 0,
      estimatedEquityMin: 0,
      estimatedEquityMax: 0,
      assessedTotalValueMin: 0,
      assessedTotalValueMax: 0,
    },
    preForeclosureRepsFilters: {
      status: '',
      recordingDateStart: '',
      recordingDateEnd: '',
    },
    mlsStatusFilters: {
      onMarket: '',
      mlsStatusDateStart: '',
      mlsStatusDateEnd: '',
      listingAmount: '',
    },
    mortgageInfoFilters: {
      loanType: '',
      openMortgagesMin: 0,
      openMortgagesMax: 0,
      openLienAmountMin: 0,
      openLienAmountMax: 0,
      interestRatePercentMin: 0,
      interestRatePercentMax: 0,
      interestRateType: '',
      cashBuyer: '',
      ownedFreeClear: '',
      sellerCarryBack: '',
    },
    preBuiltFilters: {},
  },
  propertyListsMap: [],
  propertyListsTable: [],
  filterLists: [],
};

const setFilterLists = (state: any) => {
  state.filterLists = [];
  const data = state.realFilters;
  Object.keys(data).forEach((dataId) => {
    Object.keys(data[dataId]).forEach((key) => {
      const value = data[dataId][key];

      if (
        key !== 'filterCount' &&
        value !== '' &&
        value !== 0 &&
        value !== 'Any' &&
        typeof value !== 'boolean' &&
        typeof value !== 'object'
      ) {
        const filter = { dataId, key, value };
        state.filterLists.push(filter);
      }
    });
  });
};

const clearFilters = (state: any) => {
  const data = state.filters;
  Object.keys(data).forEach((dataId) => {
    Object.keys(data[dataId]).forEach((key) => {
      const value = data[dataId][key];

      if (typeof value === 'boolean') {
        if (!state.realFilters[dataId][key]) state.filters[dataId][key] = false;
        else state.filters[dataId][key] = state.realFilters[dataId][key];
      } else if (typeof value === 'number') {
        if (state.realFilters[dataId][key] === 0)
          state.filters[dataId][key] = 0;
        else state.filters[dataId][key] = state.realFilters[dataId][key];
      } else if (typeof value === 'string') {
        if (state.realFilters[dataId][key] === '')
          state.filters[dataId][key] = '';
        else state.filters[dataId][key] = state.realFilters[dataId][key];
      } else state.filters[dataId][key] = state.realFilters[dataId][key];
    });
  });
};

const slice = createSlice({
  name: 'listBuilder',
  initialState,
  reducers: {
    setToggleFilters(state: DataType) {
      state.toggleFilters = !state.toggleFilters;
    },
    setOpenFilterDialog(state: DataType, action: any) {
      state.openFilterDialog = action.payload;
    },
    setViewType(state: DataType, action: any) {
      state.viewType = action.payload;
    },
    setMapType(state: DataType, action: any) {
      state.mapType = action.payload;
    },
    setMap(state: DataType, action: any) {
      state.mapRef = action.payload;
    },
    setMapPosition(state: DataType, action: any) {
      const { zoom, longitude, latitude } = action.payload;
      state.mapZoom = zoom;
      state.longitude = longitude;
      state.latitude = latitude;
    },
    setTablePageIndex(state: DataType, action: { payload: number }) {
      state.tablePageIndex = action.payload;
    },
    setData(state: DataType, action: any) {
      const {
        dataId,
        key,
        value,
      }: {
        dataId: string;
        key: string;
        value: any;
      } = action.payload;

      const tempKey = key.substring(0, key.length - 3);
      const type = key.substring(key.length - 3, key.length);

      if (
        state.filters[dataId][key] !== '' &&
        state.filters[dataId][key] !== 'Any' &&
        state.filters[dataId][key] !== 0
      ) {
        if (value === '' || value === 0 || value === 'Any') {
          state.filters[dataId].filterCount =
            state.filters[dataId].filterCount === undefined
              ? 0
              : Number(state.filters[dataId].filterCount) !== 0
              ? Number(state.filters[dataId].filterCount) - 1
              : 0;

          if (type === 'Min' || type === 'Max') {
            if (
              state.filters[dataId][tempKey + 'Min'] !== 0 &&
              state.filters[dataId][tempKey + 'Max'] !== 0
            ) {
              state.filters[dataId].filterCount =
                Number(state.filters[dataId].filterCount) + 1;
            }
          }

          if (type === 'End') {
            if (state.filters[dataId][tempKey + 'Start'] !== '') {
              state.filters[dataId].filterCount =
                Number(state.filters[dataId].filterCount) + 1;
            }
          }

          if (type === 'art') {
            if (
              state.filters[dataId][
                tempKey.substring(0, tempKey.length - 2) + 'End'
              ] !== ''
            ) {
              state.filters[dataId].filterCount =
                Number(state.filters[dataId].filterCount) + 1;
            }
          }
        }
      } else if (value !== '' && value !== 0 && value !== 'Any') {
        state.filters[dataId].filterCount =
          state.filters[dataId].filterCount === undefined
            ? 1
            : Number(state.filters[dataId].filterCount) + 1;

        if (type === 'Min' || type === 'Max') {
          if (
            state.filters[dataId][tempKey + 'Min'] !== 0 ||
            state.filters[dataId][tempKey + 'Max'] !== 0
          ) {
            state.filters[dataId].filterCount =
              Number(state.filters[dataId].filterCount) - 1;
          }
        }

        if (type === 'End') {
          if (state.filters[dataId][tempKey + 'Start'] !== '') {
            state.filters[dataId].filterCount =
              Number(state.filters[dataId].filterCount) - 1;
          }
        }

        if (type === 'art') {
          if (
            state.filters[dataId][
              tempKey.substring(0, tempKey.length - 2) + 'End'
            ] !== ''
          ) {
            state.filters[dataId].filterCount =
              Number(state.filters[dataId].filterCount) - 1;
          }
        }
      }

      state.filters[dataId][key] = value;

      // SET FILTERLISTS
      setFilterLists(state);
    },
    clearFilterList(state: DataType, action: any) {
      const {
        dataId,
        key,
      }: {
        dataId: string;
        key: string;
      } = action.payload;

      if (typeof state.realFilters[dataId][key] === 'number') {
        state.realFilters[dataId][key] = 0;
      } else {
        state.realFilters[dataId][key] = '';
      }

      const tempKey = key.substring(0, key.length - 3);
      const type = key.substring(key.length - 3, key.length);
      state.realFilters[dataId].filterCount =
        Number(state.realFilters[dataId].filterCount) - 1;

      if (type === 'Min' || type === 'Max') {
        if (
          state.realFilters[dataId][tempKey + 'Min'] !== 0 ||
          state.realFilters[dataId][tempKey + 'Max'] !== 0
        ) {
          state.realFilters[dataId].filterCount =
            Number(state.realFilters[dataId].filterCount) + 1;
        }
      }

      if (type === 'End') {
        if (state.realFilters[dataId][tempKey + 'Start'] !== '') {
          state.realFilters[dataId].filterCount =
            Number(state.realFilters[dataId].filterCount) + 1;
        }
      }

      if (type === 'art') {
        if (
          state.realFilters[dataId][
            tempKey.substring(0, tempKey.length - 2) + 'End'
          ] !== ''
        ) {
          state.realFilters[dataId].filterCount =
            Number(state.realFilters[dataId].filterCount) + 1;
        }
      }

      setFilterLists(state);
      state.filters = JSON.parse(JSON.stringify(state.realFilters));
    },
    clearAllFilterLists(state: DataType) {
      Object.keys(state.realFilters).forEach((key) => {
        if (state.realFilters[key].filterCount !== undefined) {
          state.realFilters[key].filterCount = 0;
        }
      });

      state.filterLists.forEach(
        ({ dataId, key }: { dataId: any; key: any }) => {
          if (typeof state.realFilters[dataId][key] === 'number') {
            state.realFilters[dataId][key] = 0;
          } else {
            state.realFilters[dataId][key] = '';
          }
        }
      );

      state.filterLists = [];
      clearFilters(state);
    },
    setPropertyListsMap(state: DataType, action: any) {
      state.propertyListsMap = action.payload;
    },
    setPropertyListsTable(state: DataType, action: any) {
      state.propertyListsTable = action.payload;
    },
    addCriteria(state: any) {
      state.realFilters = JSON.parse(JSON.stringify(state.filters));
      setFilterLists(state);
    },
    cancelCriteria(state: any) {
      clearFilters(state);
    },
    setSearchFilterList(state: DataType, action: any) {
      Object.keys(state.filters.locationFilters).forEach((key) => {
        state.filters.locationFilters[key] = '';
      });
      state.filters.locationFilters.filterCount = 0;

      const data = action.payload;
      let count: number = 0;
      data.forEach((component: any) => {
        if (component.types[0]) {
          if (component.types[0] === 'postal_code') {
            state.filters.locationFilters.zipCode = component.long_name;
            count += 1;
          }
          if (component.types[0] === 'locality') {
            state.filters.locationFilters.city = component.long_name;
            count += 1;
          }
          if (component.types[0] === 'administrative_area_level_2') {
            state.filters.locationFilters.county = component.long_name;
            count += 1;
          }
          if (component.types[0] === 'administrative_area_level_1') {
            state.filters.locationFilters.msa = component.short_name;
            count += 1;
          }
        }
      });

      state.filters.locationFilters.filterCount = count;
      state.realFilters = JSON.parse(JSON.stringify(state.filters));
      setFilterLists(state);
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setToggleFilters,
  setViewType,
  setMapType,
  setMap,
  setMapPosition,
  setTablePageIndex,
  setOpenFilterDialog,
  setData,
  clearFilterList,
  clearAllFilterLists,
  addCriteria,
  cancelCriteria,
  setSearchFilterList,
  setPropertyListsMap,
  setPropertyListsTable,
} = slice.actions;
