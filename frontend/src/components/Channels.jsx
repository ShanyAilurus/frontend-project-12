import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import filter from 'leo-profanity';
import { actions as channelsActions } from '../slise/channelsSlice';
import AddingChannel from './AddingChannel';
import slices from '../slise/index';
import AddModal from '../modalWindow/AddModal';
import RemoveChannel from '../modalWindow/RemoveChannel';
import RenameChannel from '../modalWindow/RenameChannel';

const socket = io();
socket.on('addChannel', (payload) => {
  slices.dispatch(channelsActions.addChannel(payload));
  slices.dispatch(channelsActions.setChannelId(payload.id));
});
socket.on('removeChannel', (payload) => {
  slices.dispatch(channelsActions.removeChannel(payload));
  slices.dispatch(channelsActions.setChannelId(1));
});
socket.on('renameChannel', (payload) => {
  slices.dispatch(channelsActions.renameChannel(payload));
});
const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelIdActiv = useSelector((state) => state.channelReduser.channelId);
  const dispatch = useDispatch();
  filter.loadDictionary('ru');

  const [addModalActive, setAddModalActive] = useState(false);
  const [deleteModalActive1, setDeleteModalActive1] = useState(false);
  const [renameModalActive, setRenameModalActive] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const getChannelId = (id) => {
    dispatch(chatActions.setChannelId(id));
  };
  const ModalWindowControl = channels.map((channel) => {
    const { name, id, removable } = channel;
    return (removable === false ? (
      <li className="nav-item w-100" key={id}>
        <button
          type="button"
          className={id === channelIdActiv ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
          onClick={() => getChannelId(id)}
        >
          <span
            className="me-1"
          >
            #
          </span>
          {name}
        </button>
      </li>
    ) : (
      <li className="nav-item w-100" key={id}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={id === channelIdActiv ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
            onClick={() => getChannelId(id)}
            id="dropdown-split-basic"
            className="w-50"
          >
            <span className="me-1">#</span>
            {filter.clean(name)}
          </Button>
          <Dropdown.Toggle
            variant={id === channelIdActiv ? 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary' : 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn'}
            id="react-aria9457689434-1"
          >
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => { setDeleteModalActive1(true); setChannelId(id); }}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => { setRenameModalActive(true); setChannelId(id); }}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    ));
  });
  return (
    <>
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('channels')}</span>
          <button
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={() => setAddModalActive(true)}
          >
            <AddingChannel />
            <span className="visually-hidden">{t('plus')}</span>
          </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {ModalWindowControl}
        </ul>
      </div>
      <AddModal active={addModalActive} setActive={setAddModalActive} />
      <RemoveChannel
        active={deleteModalActive1}
        setActive={setDeleteModalActive1}
        channelId={channelId}
      />
      <RenameChannel
        active={renameModalActive}
        setActive={setRenameModalActive}
        channelId={channelId}
      />
    </>
  );
};

export default Channels;
