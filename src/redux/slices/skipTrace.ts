import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle

type DataType = {
  [key: string]: any;
};

const initialState: DataType = {
  step: 0,
  importStep: 1,
  selectedDays: 0,
  data: [[]],
  balance: 0,
  dataCollapse: [['1', '1', '1', '1', '1', '1', '1']],
  uploadFiles: [] as any,
  uploadedFileName: '',
  sheets: [],
  headers: [[]],
  destinations: [],
  rowCounts: 0,
};

const slice = createSlice({
  name: 'skipTrace',
  initialState,
  reducers: {
    setStep(state: DataType, action: { payload: number }) {
      state.step = action.payload;
    },
    setData(state: DataType, action: any) {
      state.data = action.payload;
    },
    setBalance(state: DataType, action: { payload: number }) {
      state.balance = action.payload;
    },
    setImportStep(state: DataType, action: any) {
      state.importStep = action.payload;
    },
    setUploadFiles(state: DataType, action: any) {
      state.uploadFiles = action.payload;
    },
    setUploadedFileName(state: DataType, action: { payload: string }) {
      state.uploadedFileName = action.payload;
    },
    setSheets(state: DataType, action: { payload: [] }) {
      state.sheets = action.payload;
    },
    setHeaders(state: DataType, action: { payload: [[]] }) {
      state.headers = action.payload;
    },
    setDestinations(state: DataType, action: any) {
      const { index, value } = action.payload;
      state.destinations[index] = value;
    },
    setRowCounts(state: DataType, action: { payload: number }) {
      state.rowCounts = action.payload;
    },
    setSelectedDays(state: DataType, action: any) {
      state.selectedDays = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setStep,
  setData,
  setBalance,
  setImportStep,
  setUploadFiles,
  setUploadedFileName,
  setSheets,
  setHeaders,
  setDestinations,
  setRowCounts,
  setSelectedDays,
} = slice.actions;
