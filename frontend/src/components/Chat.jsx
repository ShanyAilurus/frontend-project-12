import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchData from './fetchData';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  // const navigate = useNavigate();
  // const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(FetchData(token));
    }
  }, [dispatch, token]);

  // использовать useSelector, чтобы получить данные о каналах и сообщениях из Redux-состояния
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={channels} />
        <Messages messages={messages} />
      </div>
    </div>
  );
};
export default Chat;
