import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import NotFound from './NotFound';
import Login from './Login';
import Chat from './Chat';
import Registration from './Registration';
import AuthContext from '../contex/AuthContext';
import store from '../slise';
// import rout from '../rout';

const AuProvider = ({ children }) => {
  const [token, setToken] = useState('');
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
          <button type="button" className="btn btn-primary">Выйти</button>
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
      <div className="Toastify" />
    </div>
  </div>
);

export default App;
