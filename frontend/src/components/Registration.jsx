import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Registrat from '../imgs/registrate.jpg';
import rout from '../route';
import useAuth from '../hooks/useAuth';

const Registration = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const notifyNetwork = () => toast.error(t('errorLoadingData'));
  const notifyServer = () => toast.error(t('serverError'));

  const registrationSchema = yup.object().shape({
    username: yup.string().trim()
      .min(3, t('numberCharacters'))
      .max(20, t('numberCharacters'))
      .required(t('obligatoryField')),
    password: yup.string().trim()
      .min(6, t('moreCharacters'))
      .required(t('obligatoryField')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('passwordsMustMatch'))
      .required(t('obligatoryField')),
  });

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const {
    values, errors, touched, handleChange, handleSubmit, handleBlur, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      setSubmitting(true);
      axios.post(rout.creatNewUser(), { username: values.username, password: values.password })
        .then((response) => {
          auth.logIn(response);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return notifyNetwork();
          }
          if (err.response.status === 409) {
            errors.username = t('alreadyExists');
            return setSubmitting(false);
          }
          if (err.response.status === 500) {
            return notifyServer();
          }
          return setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={Registrat} className="rounded-circle" alt={t('registration')} />
              </div>
              <form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('registration')}</h1>
                <div className="form-floating mb-3">
                  <Form.Control
                    placeholder={t('numberCharacters')}
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.username}
                    onBlur={handleBlur}
                    ref={usernameRef}
                  />
                  <label className="form-label" htmlFor="username">{t('userName')}</label>
                  <div className="invalid-tooltip">{errors.username}</div>
                </div>
                <div className="form-floating mb-3">
                  <Form.Control
                    placeholder={t('moreCharacters')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  <div className="invalid-tooltip">{errors.password}</div>
                  <label className="form-label" htmlFor="password">{t('password')}</label>
                </div>
                <div className="form-floating mb-4">
                  <Form.Control
                    placeholder={t('passwordsMustMatch')}
                    name="confirmPassword"
                    autoComplete="new-password"
                    required=""
                    type="password"
                    id="confirmPassword"
                    className={errors.confirmPassword && touched.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  <div className="invalid-tooltip">{errors.confirmPassword}</div>
                  <Form.Label
                    className="form-label"
                    htmlFor="confirmPassword"
                  >
                    {t('confirmPassword')}
                  </Form.Label>
                </div>
                <Button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary btn-light"
                  onClick={handleSubmit}
                >
                  {t('register')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
