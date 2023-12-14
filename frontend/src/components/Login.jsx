import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImg from '../imgs/login.jpeg';
import { loginSchema } from '../schemas';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const location = useLocation();
  // const history = useHistory(); // Использовать useHistory для редиректа
  const auth = useContext(AuthContext); // Получить контекст аутентификации

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
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post('/api/v1/login', { username, password }); // Отправка данных на сервер для авторизации
        // Перенаправление на страницу с чатом или другую страницу
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          // Редирект на страницу с чатом
          auth.logIn(token); // Используйте метод logIn из контекста аутентификации
          navigate('/'); // Используем navigate для перенаправления
        } else {
          // Обработка других статусов, если это не 200
          throw new Error('Ошибка авторизации');
        }
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();
          formik.errors.username = ' ';
          formik.errors.password = 'Неверные имя пользователя или пароль';
          setAuthFailed(true);
          return;
        }
        throw error;
      }
    },
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
                      autoComplete="username"
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
                      autoComplete="current-password"
                      required
                      placeholder={t('password')}
                      type="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed || formik.errors.password}
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
