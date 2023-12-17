import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import useSocket from '../../hooks/useSocket';
import { actions as modalsActions } from '../../slice/modalsSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const socketChat = useSocket();
  const dispatch = useDispatch();
  const onHide = () => dispatch(modalsActions.closeModal());
  const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);
  const channelId = modalInfo.item;
  const channels = useSelector((state) => state.channelsReducer.channels);
  const channelName = channels.map((i) => i.name);
  const notify = () => toast.success(t('channelRenamed'));

  const renameModalSchema = yup.object().shape({
    channelName: yup.string().trim()
      .min(3, t('numberCharacters'))
      .max(20, t('numberCharacters'))
      .required(t('obligatoryField'))
      .notOneOf(channelName, t('mustUnique')),
  });

  const channelToRename = channels.find((i) => i.id === channelId);
  const {
    values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      channelName: channelToRename ? channelToRename.name : '',
    },
    validationSchema: renameModalSchema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      socketChat.renameChannel(channelId, values)
        .then(() => {
          notify();
          onHide();
        })
        .catch((error) => {
          console.log('ERROR', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const classError = cn('mb-2 form-control', {
    'mb-2 form-control is-invalid': errors.channelName,
  });

  const inputRef = useRef(null);

  const showModal = () => {
    inputRef.current.focus();
  };

  return (
    <Modal show centered onShow={showModal}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <Modal.Footer>
              <Form.Control
                ref={inputRef}
                name="channelName"
                id="channelName"
                className={classError}
                value={values.channelName}
                onChange={handleChange}
              />
              <Form.Label className="visually-hidden" htmlFor="channelName">{t('channelName')}</Form.Label>
              <div className="invalid-feedback">{errors.channelName}</div>
            </Modal.Footer>
          </FormGroup>
          <FormGroup className="d-flex justify-content-end m-3">
            <Button
              variant="secondary"
              type="button"
              className="me-2 btn-secondary"
              onClick={() => onHide()}
            >
              {t('cancel')}
            </Button>
            <Button
              className="btn-primary"
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {t('send')}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
