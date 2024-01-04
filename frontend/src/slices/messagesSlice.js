/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addManyMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.deleteChannel, (state, { payload }) => {
        const channelId = payload;
        const resultEntities = Object.values(state.entities)
          .filter((msg) => msg.channelId !== channelId);
        messagesAdapter.setAll(state, resultEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
