/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from '../schemas';
import Registrat from '../imgs/registrate.jpg';

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    values, errors, touched, handleChange, handleSubmit, handleBlur, setSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      axios.post('/api/v1/signup', { username: values.username, password: values.password })
        .then((response) => {
          const data = JSON.stringify(response.data);
          localStorage.clear();
          localStorage.setItem('userInfo', data);
          navigate('/');
        })
        .catch((err) => {
          if (err.response.status === 409) {
            errors.username = 'Такой пользователь уже существует';
            return setSubmitting(false);
          }
          return setSubmitting(false);
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
                  <input
                    placeholder="От 3 до 30 символов"
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.username}
                    onBlur={handleBlur}
                  />
                  <label className="form-label" htmlFor="username">Имя пользователя</label>
                  <div placement="right" className="invalid-tooltip">Обязательное поле</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    placeholder="Не менее 6 символов"
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
                  <div className="invalid-tooltip">Обязательное поле</div>
                  <label className="form-label" htmlFor="password">Пароль</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className={errors.confirmPassword && touched.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                  />
                  <div className="invalid-tooltip">{errors.confirmPassword}</div>
                  <label
                    className="form-label"
                    htmlFor="confirmPassword"
                  >
                    Подтвердите пароль
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary btn-light"
                >
                  Зарегистрироваться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
