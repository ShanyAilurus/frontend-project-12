import { useSelector } from 'react-redux';
import React from 'react';
import { io } from 'socket.io-client';
import { actions as messageActions } from '../slise/messagesSlice'; // Импортируем
import slices from '../slise/index';
import FormMes from './FormMes';

const socket = io();
socket.on('newMessage', (payload) => {
  slices.dispatch(messageActions.addMessage(payload));
});

const Messages = () => {
  // const { t } = useTranslation();
  const channels = useSelector((state) => state.chatReducer.channels);
  const channelsId = useSelector((state) => state.chatReducer.channelId);
  const messages = useSelector((state) => state.messageReducer.message);

  const activChannelName = (channels1) => {
    const filter = channels1.filter((channel) => channel.id === channelsId).map((i) => i.name);
    return filter[0];
  };

  const numberOfMessages = (number) => {
    number %= 100;
    if (number >= 5 && number <= 20) {
      return 'сообщений';
    }
    number %= 10;
    if (number === 1) {
      return 'сообщение';
    }
    if (number >= 2 && number <= 4) {
      return 'сообщения';
    }
    return 'сообщений';
  };
  const outputMessage = messages.map((mes) => {
    const { body, username, id } = mes;
    return (
      <div className="text-break mb-2" key={id}>
        <b>{username}</b>
        :
        {body}
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
              {activChannelName(channels)}
              {' '}
            </b>
          </p>
          <span className="text-muted">
            {messages.length}
            {' '}
            {numberOfMessages((messages.length))}
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
