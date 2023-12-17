import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import rout from '../route';
import non from '../imgs/non.png';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('notFound')} className="img-fluid h-25" src={non} />
      <h1 className="h4 text-muted">{t('notFound')}</h1>
      <p className="text-muted">
        {t('redirectTextBegin')}
        <Link to={rout.chat}>{t('redirectTextEnd')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
