import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const loginSchema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(4).max(30).required(),
});

export default loginSchema;
