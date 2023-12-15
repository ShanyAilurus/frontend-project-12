import * as yup from 'yup';

export const loginSchema = () => yup.object().shape({
  username: yup.string().trim().min(3).max(20)
    .required(),
  password: yup.string().trim().min(4).max(30)
    .required(),
});

export const messageSchema = yup.object().shape({
  messageBody: yup.string().trim().required(),
});

export const registrationSchema = yup.object().shape({
  username: yup.string().trim().min(3).max(20)
    .required(),
  password: yup.string().trim().min(4).max(30)
    .required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required(),
});
