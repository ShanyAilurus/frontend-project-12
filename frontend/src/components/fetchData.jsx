import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import rout from '../rout';

// Создаем асинхронное действие с помощью createAsyncThunk
const FetchData = createAsyncThunk('data/fetchData', async (authHeader) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(rout.getData(), {
      headers: {
        Authorization: `Bearer ${authHeader}`,
      },
    });
    return response.data;
  } catch (error) {
    // Обработка ошибок, если необходимо
    throw error;
  }
});

export default FetchData;
