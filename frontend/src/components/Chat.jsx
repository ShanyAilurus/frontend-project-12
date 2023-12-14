import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Chat = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !auth.isAuthenticated) {
      navigate('/login'); // Перенаправить на страницу входа при отсутствии токена
    }
  }, [navigate, auth]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <span>Chat Hexlet</span>
      </div>
    </div>
  );
};

export default Chat;
