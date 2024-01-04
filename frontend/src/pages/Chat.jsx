import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import ShowModal from '../components/modalWindow/index';
import useAuth from '../hooks/useAuth';
import routes from '../route';
import { messagesActions, channelsActions } from '../slices/index';

const getAuthHeader = (data) => {
  if (data && data.token) {
    return { Authorization: `Bearer ${data.token}` };
  }
  return {};
};

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate(routes.login(), { replace: false });
        return;
      }
      try {
        const userData = {
          headers: getAuthHeader(user),
        };
        const {
          data: { channels, messages, currentChannelId },
        } = await axios.get(routes.dataPath(), userData);
        dispatch(channelsActions.addManyChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addManyMessages(messages));
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          logout();
          navigate(routes.login(), { replace: false });
        }
        console.log(error);
        toast.error(t('networkError'));
      }
    };
    fetchData();
  }, [dispatch, logout, user, navigate, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <Messages />
        </div>
      </div>
      <ShowModal />
    </div>
  );
};

export default Chat;
