import React, { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const getToken = () => localStorage.getItem('token');

  const [isAuthenticated, setAuthenticated] = useState(Boolean(getToken()));

  const logIn = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  const authValue = useMemo(() => ({ isAuthenticated, logIn, logOut }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
