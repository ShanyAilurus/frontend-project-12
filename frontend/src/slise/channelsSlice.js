import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.channels = action.payload;
    },
  },
});

export const { actions } = chatSlice;
export default chatSlice.reducer;
