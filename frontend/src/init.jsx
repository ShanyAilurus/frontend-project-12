import i18next from 'i18next';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ProviderRoll, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index';
import SocketProvider from './contexts/SocketProvider';
import rollbarConfig from './rollbarConfig';
import { channelsActions, messagesActions } from './slices/index';
import store from './slices/store';
import AuthProvider from './contexts/AuthProvider';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    fallbackLng: 'ru',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.deleteChannel(id));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
  });

  return (
    <React.StrictMode>
      <ProviderRoll config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <SocketProvider socket={socket}>
              <AuthProvider>
                <I18nextProvider i18n={i18n}>
                  <App />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                  />
                </I18nextProvider>
              </AuthProvider>
            </SocketProvider>
          </Provider>
        </ErrorBoundary>
      </ProviderRoll>
    </React.StrictMode>
  );
};

export default init;
