import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import { useTranslation, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import i18next from 'i18next';
import NotFound from './NotFound';
import Login from './Login';
import Chat from './Chat';
import Registration from './Registration';
import AuthContext from '../contex/AuthContext';
import store from '../slise';
import ru from './locales/index';

const AuProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const contValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  return (
    <AuthContext.Provider value={contValue}>
      {children}
    </AuthContext.Provider>
  );
};

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    resources: { ru },
  });

const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container"><a className="navbar-brand" href="/">{t('mainHeader')}</a></div>
            {localStorage.getItem('userInfo')
              ? <button onClick={() => logOut()} type="button" className="btn btn-primary">{t('goOut')}</button> : null}
          </nav>
          <Provider store={store}>
            <AuProvider>
              <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuProvider>
          </Provider>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
