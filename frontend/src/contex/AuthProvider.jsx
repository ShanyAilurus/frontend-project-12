import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../locales/useAuth';
import AuthContext from './AuthContext';
import routes from '../route';

const AuthProvider = ({ children }) => {
  const getUser = JSON.parse(localStorage.getItem('user'));

  const [token, setToken] = useState(getUser ?? null);
  const navigate = useNavigate();

  const logIn = useCallback((response) => {
    const data = JSON.stringify(response.data);
    localStorage.clear();
    localStorage.setItem('userInfo', data);
    setToken(data);
    navigate('/');
  }, [navigate]);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    navigate(routes.logIn);
  }, [navigate]);

  const context = useMemo(() => ({
    token,
    setToken,
    logOut,
    logIn,
  }), [token, setToken, logOut, logIn]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
