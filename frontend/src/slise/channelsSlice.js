import { createSlice } from '@reduxjs/toolkit';
// import fetchData from '../components/fetchData';

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
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
