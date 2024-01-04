import React, { useRef, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import useSocket from '../../hooks/useSocket';
import { selectors } from '../../slices/channelsSelectors';
import { modalsActions } from '../../slices/index';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { emitRenameChannel } = useSocket();
  const channels = useSelector(selectors.selectAll);
  const { channelId, show } = useSelector((state) => state.modal);
  const currentChannel = useSelector((state) => selectors.selectById(state, channelId));

  const channelNames = channels.map((channelName) => channelName.name);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleClose = () => dispatch(modalsActions.isClose());

  const validSchema = yup.object().shape({
    name: yup.string().trim()
      .required(t('obligatoryField'))
      .min(3, t('numberCharacters'))
      .max(20, t('numberCharacters'))
      .notOneOf(channelNames, t('mustUnique')),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel?.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      const newName = filter.clean(values.name);
      try {
        await emitRenameChannel(channelId, newName);
        formik.resetForm();
        toast.success(t('channelRenamed'));
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
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                name="name"
                id="name"
                className="mb-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                ref={inputRef}
                isInvalid={formik.errors.name}
              />
              <Form.Label htmlFor="name" visuallyHidden>{t('channelName')}</Form.Label>
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.name)}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" type="button" onClick={handleClose}>
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {t('rename')}
              </Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
