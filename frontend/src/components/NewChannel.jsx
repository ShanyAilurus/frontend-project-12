import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentChannelId } from '../slices/channelsSelectors';

const NewChannel = ({
  channel,
  handleCurrentChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const isCurrentChannel = currentChannelId === channel.id;
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        onClick={() => handleCurrentChannel(channel.id)}
        type="button"
        className="w-100 rounded-0 text-start text-truncate"
        variant={isCurrentChannel ? 'secondary' : null}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        variant={isCurrentChannel ? 'primary' : null}
        className="flex-grow-0"
        id="dropdown-split-basic"
        split
      >
        <span className="visually-hidden">{t('channelManagement')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>
          {t('delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default NewChannel;
