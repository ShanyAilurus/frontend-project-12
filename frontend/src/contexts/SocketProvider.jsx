/* eslint-disable */
import React, { useMemo } from 'react';
import { channelsActions } from '../slices/index';
import SocketContext from './SocketContext';
import store from '../slices/store';

const SocketProvider = ({ socket, children }) => {
  const emitNewMessage = ({ body, channelId, username }) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(1000)
        .emit('newMessage', { body, channelId, username }, (error, response) => {
          response?.status === 'ok' ? resolve(response) : reject(error);
        });
    });

  const emitAddChannel = (name) =>
    new Promise((resolve, reject) => {
      socket.timeout(1000).emit('newChannel', { name }, (error, response) => {
        const newAddChannel = response.data.id;
        store.dispatch(channelsActions.setCurrentChannelId(newAddChannel));
        response?.status === 'ok' ? resolve(response) : reject(error);
      });
    });

  const emitRemoveChannel = (id) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(1000)
        .emit('removeChannel', { id }, (error, response) => {
          response?.status === 'ok' ? resolve(response?.data) : reject(error);
        });
    });

  const emitRenameChannel = (id, name) =>
    new Promise((resolve, reject) => {
      socket
        .timeout(1000)
        .emit('renameChannel', { id, name }, (error, response) => {
          response?.status === 'ok' ? resolve(response?.data) : reject(error);
        });
    });
  const socketContextValue = useMemo(() => ({
    emitNewMessage, emitAddChannel, emitRemoveChannel, emitRenameChannel,
  }), []);

  return (
    <SocketContext.Provider value={socketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
