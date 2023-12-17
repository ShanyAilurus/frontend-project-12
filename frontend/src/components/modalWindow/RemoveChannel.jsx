import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormGroup from 'react-bootstrap/FormGroup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import { actions as modalsActions } from '../../slice/modalsSlice';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('channelDeleted'));
  const socketChat = useSocket();
  const dispatch = useDispatch();
  const onHide = () => dispatch(modalsActions.closeModal());
  const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);
  const channelId = modalInfo.targetId;

  const {
    handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      removingChannelId: null,
    },
    onSubmit: () => {
      setSubmitting(true);
      socketChat.removeChannel(channelId)
        .then(() => {
          onHide();
          notify();
        })
        .catch((error) => {
          console.log('ERROR', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const inputRef = useRef(null);

  return (
    <Modal show centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title className="modal-title h4">{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="lead">{t('sure')}</p>
        </Modal.Body>
        <FormGroup className="d-flex justify-content-end m-3">
          <Button
            className="me-2 btn-secondary"
            variant="secondary"
            onClick={() => onHide()}
          >
            {t('cancel')}
          </Button>
          <Button
            className="btn-primary"
            type="submit"
            variant="danger"
            ref={inputRef}
            disabled={isSubmitting}
          >
            {t('delete')}
          </Button>
        </FormGroup>
      </form>
    </Modal>
  );
};

export default RemoveChannel;
