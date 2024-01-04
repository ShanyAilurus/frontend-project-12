import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  type: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    isOpen: (state, { payload }) => {
      const { type, channelId = null } = payload;
      return {
        ...state,
        show: true,
        type,
        channelId,
      };
    },
    isClose: (state) => ({
      ...state, type: null, channelId: null,
    }),
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
