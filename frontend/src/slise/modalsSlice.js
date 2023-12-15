import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: 1,
  type: null,
  item: null,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      const { type, item } = payload;
      state.type = type;
      state.item = item;
    },
    closeModal(state) {
      state.type = null;
      state.item = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
