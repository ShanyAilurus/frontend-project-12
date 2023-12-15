import { io } from 'socket.io-client';
import { useCallback } from 'react';
import SocketContext from './SocketContext';

const SocketProvider = ({ children }) => {
  const socket = io();
  const newMessage = useCallback(async (data) => {
    await socket.emit('newMessage', data);
  }, [socket]);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket, newMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
