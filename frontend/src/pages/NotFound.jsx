import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../route';
import non from '../images/non.png';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        src={non}
        width={250}
        height={250}
        alt={t('notFound')}
        className="img-fluid h-20"
      />
      <h1 className="text-muted h4">{t('notFound')}</h1>
      <p className="text-muted">
        {t('redirectTextBegin')}
        <Link to={routes.chat()}>{t('redirectTextEnd')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
