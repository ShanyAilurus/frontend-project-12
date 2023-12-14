import React, {
  useMemo, useState,
} from 'react';

// import useAuth from '../locales/useAuth';
import AuthContext from '../locales/AuthContext';

const AuthProvider = ({ children }) => {
  const getUser = () => JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(getUser());

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAuthHeader = () => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  const authValue = useMemo(() => ({
    loggedIn: Boolean(user && user.token),
    logIn,
    logOut,
    getAuthHeader,
  }), [user, getAuthHeader]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
