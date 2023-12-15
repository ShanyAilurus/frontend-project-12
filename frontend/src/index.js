import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import './assets/application.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/order
import { io } from 'socket.io-client';

const socket = io();

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socket));
};

app();
