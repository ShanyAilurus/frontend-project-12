import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import filterWords from 'leo-profanity';
import FormMes from './FormMessage';
import useSocket from '../../hooks/useSocket';

const Messages = () => {
  const channels = useSelector((state) => state.channelsReducer.channels) || [];
  const channelsId = useSelector((state) => state.channelsReducer.channelId);
  const messages = useSelector((state) => state.messagesReducer.messages) || [];
  const [message, setMessage] = useState('');

  const { t } = useTranslation();
  const socketChat = useSocket();

  const activeChannelId = (channels1) => {
    const filter = channels1.find((channel) => channel.id === channelsId);
    return filter ? filter.name : t('noChannel');
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socketChat.newMessage(message, channelsId)
      .then(() => {
        setMessage('');
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };
  const chennalMessage = messages.filter((mes) => mes.channelId === channelsId);

  const outputMessage = chennalMessage.map((mes) => {
    const { body, username, id } = mes;
    return (
      <div className="text-break mb-2" key={id}>
        <b>{username}</b>
        :
        {filterWords.clean(body)}
      </div>
    );
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {activeChannelId(channels)}
              {' '}
            </b>
          </p>
          <span className="text-muted">
            {`${chennalMessage.length} ${t('messagesCounter.messages', { count: (chennalMessage.length) })}`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {outputMessage}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2" onSubmit={sendMessage}>
            <div className="input-group has-validation">
              <Form.Control
                name="body"
                aria-label={t('messageNev')}
                placeholder={t('enterMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                ref={inputRef}
              />
              <Button
                type="submit"
                className="btn btn-group-vertical"
                disabled={!message}
              >
                <FormMes />
                <span className="visually-hidden">{t('send')}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
