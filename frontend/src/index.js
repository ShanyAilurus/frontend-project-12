import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import './assets/application.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(init());
};

app();
