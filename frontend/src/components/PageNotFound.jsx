import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundPic from '../assets/404.svg';
import { routes } from '../routes.js';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('notFound.header')} className="img-fluid h-25" src={notFoundPic} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        {' '}
        <a href={routes.rootPath()}>{t('notFound.linkText')}</a>
      </p>
    </div>
  );
};

export default PageNotFound;
