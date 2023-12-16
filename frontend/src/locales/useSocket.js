import { useContext } from 'react';
import SocketContext from '../contex/SocketContext';

const useSocket = () => useContext(SocketContext);

export default useSocket;
