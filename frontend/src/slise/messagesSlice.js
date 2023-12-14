/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import FetchData from '../components/fetchData';

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(FetchData.fulfilled, (state, action) => {
    state.channels = action.payload.channels;
    state.currentChannelId = action.payload.currentChannelId;
  }),
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
