import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle

type DataType = {
  [key: string]: any;
};

const initialState: DataType = {
  loading: false,
  notification: '',
  notiType: '',
  notiVisible: false,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalLoading(state: DataType, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    setNotification(
      state: DataType,
      action: { payload: { notiType: string; notification: string } }
    ) {
      const { notification, notiType } = action.payload;
      state.notification = notification;
      state.notiType = notiType;
      state.notiVisible = true;
    },
    hideNotification(state: DataType) {
      state.notiVisible = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setGlobalLoading, setNotification, hideNotification } =
  slice.actions;
