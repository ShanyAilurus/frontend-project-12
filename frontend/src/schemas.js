import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { t } = useTranslation();

export const loginSchema = () => yup.object().shape({
  username: yup.string().trim().min(3).max(20)
    .required(),
  password: yup.string().trim().min(6).max(30)
    .required(),
});
export const messageSchema = yup.object().shape({
  messageBody: yup.string().trim().required(),
});
export const registrationSchema = yup.object().shape({
  username: yup.string().trim().min(3).max(20)
    .required(),
  password: yup.string().trim().min(6).max(30)
    .required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('passwordsMustMatch')).required(),
});
