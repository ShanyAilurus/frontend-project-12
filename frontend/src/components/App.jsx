import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
// import Reac, { useEffect, useState } from 'react';
import NotFound from './NotFound';
import Login from './Login';
import Chat from './Chat';
// import AuthProvider from './AuthProvider';
import Registration from './Registration';
import useAuth from '../locales/useAuth';
// import rout from '../rout';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        index
        element={(
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
          )}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
