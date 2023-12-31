import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import './styles/application.scss';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init());
};

app();
