import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@rollbar/react';
import AuthProvider from '../context/AuthProvider';
import NotFound from './NotFound';
import Login from './Login';
import Chat from './Chat';
import Registration from './Registration';
import AuthNavbar from './Navbar';
import Modal from './Modal';

import useAuth from '../hooks/useAuth';
import store from '../slice/index';
import route from '../route';

const RoutePrivate = ({ children }) => {
  const auth = useAuth();

  return auth.logIn ? children : auth.logOut;
};

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <AuthNavbar />

          <Routes>
            <Route path={route.chat} element={<RoutePrivate><Chat /></RoutePrivate>} />
            <Route path={route.logIn} element={<Login />} />
            <Route path={route.signup} element={<Registration />} />
            <Route path={route.err} element={<NotFound />} />
          </Routes>
          <Modal />
        </div>
        <ToastContainer />
      </AuthProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
