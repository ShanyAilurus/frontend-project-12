import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import FormMes from './FormMessage';
import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';
import {
  selectCurrentChannelId,
  selectors,
} from '../slices/channelsSelectors';
import { messagesSelectors } from '../slices/messagesSlice';

const Messages = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const refInput = useRef(null);
  const msgRefInput = useRef(null);
  const { emitNewMessage } = useSocket();
  const { user } = useAuth();
  const channels = useSelector(selectors.selectAll);
  const currentId = useSelector(selectCurrentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentId);
  const messages = useSelector(messagesSelectors.selectAll);

  const filteredMessages = messages.filter((msg) => msg.channelId === currentId);

  useEffect(() => {
    refInput.current.focus();
  }, [currentChannel]);

  useEffect(() => {
    if (msgRefInput.current) {
      msgRefInput.current.scrollTop = msgRefInput.current.scrollHeight;
    }
  }, [filteredMessages]);

  const validSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: validSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      const filterBody = filter.clean(values.body);
      const message = {
        body: filterBody,
        channelId: currentId,
        username: user.username,
      };
      try {
        setIsSending(true);
        emitNewMessage(message);
        setIsSending(false);
        formik.resetForm();
      } catch (error) {
        toast.error(`${t('networkError')}`);
        setIsSending(false);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    if (formik.values.body.trim() === '') {
      refInput.current.focus();
    }
  }, [formik.values.body]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{currentChannel && `# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">
          {t('counter.count', { count: filteredMessages.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={msgRefInput}>
        {filteredMessages.map((message) => (
          message.username === user.username ? (
            <div
              key={message.id}
              className="text-break mb-2"
              style={{ backgroundColor: '#F4F4F4' }}
            >
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ) : (
            <div
              key={message.id}
              className="text-break mb-2"
              ref={msgRefInput}
            >
              <div className="d-inline-flex bg-body p-2 rounded border">
                <div>
                  <b>{message.username}</b>
                </div>
                :
                {' '}
                {message.body}
              </div>
            </div>
          )
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          onSubmit={formik.handleSubmit}
          noValidate
          className="py-1 border rounded-2"
        >
          <InputGroup className="input-group has-validation">
            <Form.Control
              type="text"
              required
              className="border-0 p-0 ps-2"
              onChange={formik.handleChange}
              value={formik.values.body}
              name="body"
              aria-label={t('messageNew')}
              ref={refInput}
              onBlur={formik.handleBlur}
              placeholder={t('enterMessage')}
            />
            <Button
              type="submit"
              variant="group-vertical"
              disabled={!formik.values.body.length || isSending}
            >
              <FormMes />
              <span className="visually-hidden">
                {t('send')}
              </span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
