import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocket from '../../hooks/useSocket';
import { actions as channelsActions } from '../../slice/channelsSlice';
import { actions as modalsActions } from '../../slice/modalsSlice';

const AddChannelModal = () => {
  const socketChat = useSocket();
  const dispatch = useDispatch();
  const onHide = () => dispatch(modalsActions.closeModal());
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channelsReducer.channels);
  const channelName = channels ? channels.map((i) => i.name) : [];
  const notify = () => toast.success(t('channelCreated'));

  const renameModalSchema = yup.object().shape({
    channelName: yup.string().trim()
      .min(3, t('numberCharacters'))
      .max(20, t('numberCharacters'))
      .required(t('obligatoryField'))
      .notOneOf(channelName, t('mustUnique')),
  });

  const {
    values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: renameModalSchema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      socketChat.addChannel(values)
        .then((response) => {
          console.log(response.id);
          dispatch(channelsActions.moveToChannel(response.id));
          values.channelName = '';
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
    <Modal show centered onShow={showModal} className="modal-form">
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
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
        </Form.Group>
        <FormGroup className="d-flex justify-content-end m-3">
          <Button
            variant="secondary"
            type="button"
            className="me-2"
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
    </Modal>
  );
};

export default AddChannelModal;
