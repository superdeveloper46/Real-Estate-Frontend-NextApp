import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle

type DataType = {
  [key: string]: any;
};

const initialState: DataType = {
  property: [],
  overview: [],
  currentMortgages: [],
  transaction: [],
  ownerDemographics: [],
};

const slice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setData(state: DataType, action: any) {
      const { key } = action.payload;
      state[key] = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setData } = slice.actions;
