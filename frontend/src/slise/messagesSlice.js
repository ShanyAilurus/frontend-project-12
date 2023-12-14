/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import fetchData from '../components/fetchData';

const initialState = {
  messages: [],
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
