import React, {
  useRef, useEffect, useState,
} from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Button, Card, Image, Form,
} from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import loginImg from '../images/login.jpeg';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../route';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [authError, setAuthError] = useState(false);
  const { t } = useTranslation();
  const { login } = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => inputRef.current.focus(), []);

  const validScema = yup.object().shape({
    username: yup.mixed().required(t('obligatoryField')),
    password: yup.mixed().required(t('obligatoryField')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validScema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      setAuthError(false);
      try {
        const { data } = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });
        login(data);
        navigate(routes.chat(), { replace: false });
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthError(true);
          return;
        }
        if (error.code === 'ERR_NETWORK') {
          toast.error(`${t('networkError')}`);
        }
      }
      formik.setSubmitting(false);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image
                  src={loginImg}
                  width={250}
                  height={250}
                  className="rounded-circle"
                  alt={t('loginHeader')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('loginHeader')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="username"
                    required
                    autoComplete="username"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authError}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">
                    {t('yourNickname')}
                  </Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-feedback"
                    tooltip
                  >
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    required
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authError}
                  />
                  <Form.Label className="form-label" htmlFor="password">
                    {t('password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(formik.errors.password) || t('submissionFailed')}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  {t('loginHeader')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <div className="text-center">
                <span>{t('noAccountQM')}</span>
                {' '}
                <Link to={routes.signUp()}>{t('registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
