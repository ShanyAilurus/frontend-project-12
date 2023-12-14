import { configureStore } from '@reduxjs/toolkit';
// import dataReducer from './dataSlice'; // Если есть другие редукторы, добавь их сюда
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    // data: dataReducer,
    channelsReducer,
    messagesReducer,
    // Добавь другие редукторы по мере необходимости
  },
});
