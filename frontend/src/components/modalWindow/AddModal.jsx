import React, { useRef, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSocket from '../../hooks/useSocket';
import { selectors } from '../../slices/channelsSelectors';
import { modalsActions } from '../../slices/index';

const isProfanity = (value) => {
  const cleanValue = filter.clean(value);
  return cleanValue !== value;
};

const AddChannelModal = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { emitAddChannel } = useSocket();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channelName) => channelName.name);
  const { show } = useSelector((state) => state.modal);
  const validSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('obligatoryField'))
      .min(3, t('numberCharacters'))
      .max(20, t('numberCharacters'))
      .notOneOf(channelsNames, t('mustUnique'))
      .test(
        'isProfanity',
        t('obsceneLexicon'),
        (value) => !isProfanity(value),
      ),
  });

  const handleClose = () => {
    dispatch(modalsActions.isClose());
  };

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const filterName = filter.clean(values.name);
      try {
        await emitAddChannel(filterName);
        toast.success(t('channelCreated'));
        handleClose();
      } catch (error) {
        formik.setSubmitting(false);
        toast.error(t('networkError'));
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              ref={inputRef}
              className="mb-2"
              autoFocus
              isInvalid={!!formik.errors.name}
              disabled={formik.isSubmitting}
            />
            <Form.Label htmlFor="name" visuallyHidden>
              {t('channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              type="button"
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              {t('add')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
