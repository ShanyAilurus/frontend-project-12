import React, { useRef, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cn from 'classnames';
import loginImg from '../imgs/login.jpeg';
import { loginSchema } from '../schemas';
import AuthContext from '../contex/AuthContext';
import rout from '../route';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = () => toast.error(t('errorLoadingData'));

  const { setToken } = useContext(AuthContext);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const {
    values, errors, handleChange, handleSubmit, setSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      axios.post(rout.logIn(), { username: values.username, password: values.password })
        .then((response) => {
          const data = JSON.stringify(response.data);
          localStorage.clear();
          localStorage.setItem('userInfo', data);
          navigate('/');
          setToken(response.data);
          console.log('Ghjdthznmmmm', data);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return notify();
          }
          if (err.response.status === 401) {
            errors.password = t('submissionFailed');
            return setSubmitting(false);
          }
          return setSubmitting(false);
        });
    },
  });

  const errClass = cn(
    'form-control',
    {
      'form-control is-invalid':
      (errors.password) || (errors.username),
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
                    ref={passwordRef}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{t('submissionFailed')}</Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  ref={btnRef}
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('loginHeader')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('noAccountQM')}</span>
                <a href="/signup">{t('registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
