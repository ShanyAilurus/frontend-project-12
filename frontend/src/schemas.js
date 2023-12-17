import * as yup from 'yup';

export const loginSchema = () => yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().required(),
});

export const messageSchema = yup.object().shape({
  messageBody: yup.string().trim().required(),
});
