/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: 1,
  setModalInfo: { type: null, targetId: null },
  isOpened: false,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      const { type, item } = payload;
      state.setModalInfo.type = type;
      state.setModalInfo.item = item;
    },
    closeModal(state) {
      state.setModalInfo.type = null;
      state.setModalInfo.item = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
