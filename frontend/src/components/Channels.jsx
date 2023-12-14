import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as chatActions } from '../slise/channelsSlice';
import AddingChannel from './AddingChannel';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelId = useSelector((state) => state.channelReduser.channelId);
  const dispatch = useDispatch();

  const getChannelId = (id) => {
    dispatch(chatActions.setChannelId(id)); // Используем  из actions
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <AddingChannel />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => {
          const { name, id } = channel;
          return (
            <li className="nav-item w-100" key={id}>
              <button
                type="button"
                className={id === channelId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
                onClick={() => getChannelId(id)}
              >
                <span className="me-1">#</span>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
