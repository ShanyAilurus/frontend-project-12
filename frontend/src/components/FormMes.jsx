import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io();

const FormMes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const channelsId = useSelector((state) => state.channelsReducer.channelId);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch(messageActions.addMessage(newMessage));
    });

    return () => {
      socket.off('newMessage');
    };
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('newMessage', {
      body: message,
      channelId: channelsId,
      username: JSON.parse(localStorage.getItem('userInfo')).username,
    });
    setMessage('');
  };
  return (
    <form noValidate="" className="py-1 border rounded-2" onSubmit={sendMessage}>
      <div className="input-group has-validation">
        <input
          name="body"
          autoComplete="off"
          aria-label={t('messageNev')}
          placeholder={t('enterMessage')}
          className="border-0 p-0 ps-2 form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
        <button
          type="submit"
          className="btn btn-group-vertical"
          disabled={message.trim() === ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">
            {t('send')}
          </span>
        </button>
      </div>
    </form>
  );
};

export default FormMes;
