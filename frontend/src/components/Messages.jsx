/* eslint-disable react/jsx-one-expression-per-line */
import { useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { actions as messageActions } from '../slise/messagesSlice';
import slices from '../slise/index';
import FormMes from './FormMes';

const socket = io();
socket.on('newMessage', (payload) => {
  slices.dispatch(messageActions.addMessage(payload));
});

const Messages = () => {
  const channels = useSelector((state) => state.channelsReducer.channels);
  const channelsId = useSelector((state) => state.channelsReducer.channelId);
  const messages = useSelector((state) => state.messageReducer.message);

  const { t } = useTranslation();

  const activChannelId = (channels1) => {
    const filter = channels1.filter((channel) => channel.id === channelsId).map((i) => i.name);
    return filter[0];
  };
  const numberOfMessages = (number) => {
    number %= 100;
    if (number >= 5 && number <= 20) {
      return t('messages_many');
    }
    number %= 10;
    if (number === 1) {
      return t('messages_one');
    }
    if (number >= 2 && number <= 4) {
      return t('messages_several');
    }
    return t(' messages_Nol');
  };

  const chennaMessage = messages.filter((mes) => mes.channelId === channelsId);
  const outputMessage = chennaMessage.map((mes) => {
    const { body, username, id } = mes;
    return (
      <div className="text-break mb-2" key={id}>
        <b>{username}</b>
        :
        {body}
      </div>
    );
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {activChannelId(channels)} </b>
          </p>
          <span className="text-muted">
            {chennaMessage.length} {numberOfMessages((chennaMessage.length))}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {outputMessage}
        </div>
        <div className="mt-auto px-5 py-3">
          <FormMes />
        </div>
      </div>
    </div>
  );
};

export default Messages;
