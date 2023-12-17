/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const initialState = {
  messages: [],
};
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, actions) => {
        const channelId = actions.payload.id;
        const rest = state.messages.filter((i) => i.channelId !== channelId);
        state.messages = rest;
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
