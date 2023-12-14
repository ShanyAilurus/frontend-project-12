import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import loginImg from '../imgs/login.jpeg';
import { loginSchema } from '../schemas';

const Login = () => {
  const { t } = useTranslation();

  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (authFailed) {
      inputRef.current.focus();
    }
  }, [authFailed]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setAuthFailed(true);
      formik.setSubmitting(false);
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt={t('loginHeader')} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginHeader')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="username"
                      autocomplete="username"
                      required
                      id="username"
                      placeholder={t('username')}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed || formik.errors.username}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('username')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="password"
                      autocomplete="current-password"
                      required
                      placeholder={t('password')}
                      type="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={submissionFailed || formik.errors.password}
                    />
                    <Form.Label htmlFor="password">{t('password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{t('submissionFailed')}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                  >
                    {t('loginHeader')}
                  </Button>
                </fieldset>
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
