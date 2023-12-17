import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../route';

// eslint-disable-next-line import/prefer-default-export
export const fetchDataThunk = createAsyncThunk(
  'fetchInitialData',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
