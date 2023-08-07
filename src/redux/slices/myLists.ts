import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle

type DataType = {
  [key: string]: any;
};

const initialState: DataType = {
  selectedList: [],
  myLists: [],
};

const slice = createSlice({
  name: 'myLists',
  initialState,
  reducers: {
    setSelectedList(state: DataType, action: any) {
      state.selectedList = action.payload;
    },
    setMyLists(state: DataType, action: any) {
      state.myLists = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setSelectedList, setMyLists } = slice.actions;
