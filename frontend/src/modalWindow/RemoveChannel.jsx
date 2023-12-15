import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const socket = io();

const RemoveChannel = ({ active, setActive, channelId }) => {
  const { t } = useTranslation();

  const check = () => {
    socket.emit('removeChannel', { id: channelId });
    setActive(false);
  };
  return (
    <Modal show={active} centered>
      <Modal.Header closeButton onClick={() => setActive(false)}>
        <Modal.Title className="modal-title h4">{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('sure')}</p>
      </Modal.Body>
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          type="button"
          onClick={() => setActive(false)}
        >
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={() => check()}
        >
          {t('delete')}
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveChannel;
