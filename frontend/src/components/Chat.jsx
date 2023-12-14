import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Channels from './Channels';
import Messages from './Messages';
import routes from '../route';
import { actions as channelsActions } from '../slise/channelsSlice';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.getData(), { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` } });
      dispatch(channelsActions.setChannels(response.data.channels));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {Channels()}
        {Messages()}
      </div>
    </div>
  );
};
export default Chat;
