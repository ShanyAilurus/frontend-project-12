import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import filterWords from 'leo-profanity';
import { actions as channelsActions } from '../../slice/channelsSlice';

const ModalWindowControl = ({ showModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channelsReducer.channels) || [];
  const channelIdActive = useSelector((state) => state.channelsReducer.channelId);

  // eslint-disable-next-line no-shadow
  const setChannelIdAction = (id) => {
    dispatch(channelsActions.setChannelId(id));
  };
  const render = channels.map((channel) => {
    const { name, id, removable } = channel;
    return (!removable ? (
      <li className="nav-item w-100" key={id}>
        <button
          type="button"
          className={id === channelIdActive
            ? 'w-100 rounded-0 text-start btn btn-secondary truncate'
            : 'w-100 rounded-0 text-start btn truncate'}
          onClick={() => setChannelIdAction(id)}
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
            variant={`w-100 rounded-0 text-start btn ${id === channelIdActive ? 'btn-secondary' : ''} truncate`}
            onClick={() => setChannelIdAction(id)}
            id="dropdown-split-basic"
            className="w-50"
          >
            <span className="me-1">#</span>
            {filterWords.clean(name)}
          </Button>
          <Dropdown.Toggle
            variant={id === channelIdActive ? 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary' : 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn'}
            id="react-aria9457689434-1"
          >
            <span className="visually-hidden">{t('channelManagement')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => showModal('delete', id)}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => showModal('rename', id)}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    ));
  });
  return render;
};

export default ModalWindowControl;
