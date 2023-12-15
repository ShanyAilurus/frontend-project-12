import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

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
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, actions) => {
      const channaelId = actions.payload.id;
      const rest = state.messages.filter((i) => i.channelId !== channaelId);
      state.messages = rest;
    });
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
