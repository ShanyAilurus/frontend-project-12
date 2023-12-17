import i18next from 'i18next';
import React from 'react';
import { io } from 'socket.io-client';
import filterWords from 'leo-profanity';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider } from '@rollbar/react';
import App from './components/App';
import resources from './locales';
import SocketProvider from './context/SocketProvider';
import rollbarConfig from './rollbarConfig';
import { actions as channelsActions } from './slice/channelsSlice';
import { actions as messagesActions } from './slice/messagesSlice';
import slice from './slice/index';

const init = async () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  filterWords.add(filterWords.getDictionary('ru'));

  const socket = io();

  socket.on('newChannel', (payload) => {
    slice.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    slice.dispatch(channelsActions.removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    slice.dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('newMessage', (payload) => {
    slice.dispatch(messagesActions.addMessage(payload));
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RollbarProvider config={rollbarConfig}>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </RollbarProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default init;
