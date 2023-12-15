// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import route from '../route';

// // Создаем асинхронное действие с помощью createAsyncThunk
// const fetchData = createAsyncThunk('data/fetchData', async (authHeader) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axios.get(route.getData(), {
//       headers: {
//         Authorization: `Bearer ${authHeader}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // Обработка ошибок, если необходимо
//     throw error;
//   }
// });

// export default fetchData;
