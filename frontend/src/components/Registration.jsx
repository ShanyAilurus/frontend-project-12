/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { registrationSchema } from '../schemas';
import Registrat from '../imgs/registrate.jpg';

const Registration = () => {
  const { t } = useTranslation();

  const {
    values, errors, touched, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log('TOUCHED', touched.username);
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
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={errors.username ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.username}
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
                    className={errors.password ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.password}
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
                    className={errors.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.confirmPassword}
                  />
                  <div className="invalid-tooltip" />
                  <label
                    className="form-label"
                    htmlFor="confirmPassword"
                  >
                    Подтвердите пароль
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-100 btn btn-outline-primary"
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
