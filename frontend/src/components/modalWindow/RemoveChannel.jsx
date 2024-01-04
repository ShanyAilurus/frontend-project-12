import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { modalsActions, channelsActions } from '../../slices/index.js';
import { selectCurrentId } from '../../slices/channelsSelectors.js';

const defaultChannel = 1;

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { emitRemoveChannel } = useSocket();

  const { channelId, show } = useSelector((state) => state.modal);
  const currentId = useSelector(selectCurrentId);

  const handleClose = () => dispatch(modalsActions.isClose());

  const handleDeleteClick = async () => {
    try {
      await emitRemoveChannel(channelId);
      handleClose();
      if (channelId === currentId) {
        dispatch(channelsActions.setCurrentChannelId(defaultChannel));
      }
      toast.success(t('delete'));
    } catch (error) {
      toast.error(t('networkError'));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button type="submit" variant="danger" onClick={handleDeleteClick}>
            {t('delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
