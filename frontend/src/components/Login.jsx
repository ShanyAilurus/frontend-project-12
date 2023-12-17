import React, {
  useRef, useEffect, useState,
} from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import cn from 'classnames';
import loginImg from '../imgs/login.jpeg';
import { loginSchema } from '../schemas';
import 'react-toastify/dist/ReactToastify.css';
import rout from '../route';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notifyNetwork = () => toast.error(t('errorLoadingData'));
  const notifyServer = () => toast.error(t('serverError'));
  const [error, setError] = useState('');
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const {
    values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      axios.post(rout.loginPath(), { username: values.username, password: values.password })
        .then((response) => {
          auth.logIn(response);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            notifyNetwork();
          }
          if (err.response.status === 401) {
            setError(t('submissionFailed'));
            setSubmitting(false);
          }
          if (err.response.status === 500) {
            notifyServer();
          }
          setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(true);
        });
    },
  });

  const errClass = cn(
    'form-control',
    {
      'form-control is-invalid':
      (errors.password) || (errors.username) || error,
    },
  );

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt={t('loginHeader')} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">{t('loginHeader')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    placeholder={t('yourNickname')}
                    onChange={handleChange}
                    value={values.username}
                    ref={usernameRef}
                    className={errClass}
                  />
                  <Form.Label htmlFor="username">{t('yourNickname')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder={t('password')}
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    className={errClass}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{t('submissionFailed')}</Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-100 mb-3 btn-primary"
                >
                  {t('loginHeader')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('noAccountQM')}</span>
                <Link to={rout.signup}>{t('registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
