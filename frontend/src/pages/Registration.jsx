import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import axios from 'axios';
import {
  Form, Image, Button, Card,
} from 'react-bootstrap';
import Registrat from '../images/registrate.jpg';
import routes from '../route';
import useAuth from '../hooks/useAuth';

const Registration = () => {
  const [authError, setAuthError] = useState(false);
  const { t } = useTranslation();
  const { login } = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => inputRef.current.focus(), []);

  const validScema = yup.object().shape({
    username: yup
      .string()
      .required(t('obligatoryField'))
      .min(3, t('numberCharacters'))
      .max(20, t('numberCharacters')),
    password: yup
      .string()
      .required(t('obligatoryField'))
      .min(6, t('moreCharacters')),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        t('passwordsMustMatch'),
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validScema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      setAuthError(false);
      try {
        const { data } = await axios.post(routes.creatNewUser(), {
          username: values.username,
          password: values.password,
        });
        login(data);
        navigate(routes.chat());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setAuthError(true);
          inputRef.current.select();
          return;
        }
        if (error.code === 'ERR_NETWORK') {
          toast.error(`${t('networkError')}`);
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image
                  src={Registrat}
                  roundedCircle
                  alt={t('registration')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <fieldset disabled={formik.isSubmitting}>
                  <h1 className="text-center mb-4">
                    {t('registration')}
                  </h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      id="username"
                      value={formik.values.username}
                      placeholder={t('numberCharacters')}
                      autoComplete="username"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      ref={inputRef}
                      isInvalid={
                        (formik.touched.username && formik.errors.username) || authError
                      }
                    />
                    <Form.Label htmlFor="username">
                      {t('userName')}
                    </Form.Label>
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                      placement="right"
                    >
                      {t(formik.errors.username)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="password"
                      placeholder={t('moreCharacters')}
                      name="password"
                      id="password"
                      required
                      autoComplete="new-password"
                      aria-describedby="passwordHelpBlock"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.touched.password && formik.errors.password) || authError
                      }
                    />
                    <Form.Label htmlFor="password">
                      {t('password')}
                    </Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t(formik.errors.password)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      placeholder={t('confirmPassword')}
                      name="confirmPassword"
                      required
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.touched.confirmPassword && formik.errors.confirmPassword)
                         || authError
                      }
                    />
                    <Form.Label htmlFor="confirmPassword">
                      {t('confirmPassword')}
                    </Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {authError === false ? formik.errors.confirmPassword : t('userExists')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    className="w-100"
                    type="submit"
                    variant="outline-primary"
                  >
                    {t('register')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Registration;
