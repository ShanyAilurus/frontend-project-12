/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  channelId: 1,
};
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setChannelId(state, { payload }) {
      state.channelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      const renew = state.channels.filter((channel) => channel.id !== payload.id);
      state.channelId = state.channelId === payload.id ? 1 : state.channelId;
      state.channels = renew;
    },
    renameChannel(state, { payload }) {
      const renew = state.channels.map((i) => {
        if (i.id === payload.id) {
          i = payload;
          return i;
        }
        return i;
      });
      state.channels = renew;
    },
    moveToChannel(state, { payload }) {
      state.channelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
