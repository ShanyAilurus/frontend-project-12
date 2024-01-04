import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../route';

const AuthNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleBtnClick = () => {
    if (user) {
      logout();
    }
    navigate(routes.login());
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand href={routes.chat()} className="navbar-brand">
            {t('mainHeader')}
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end" />

          {user ? (
            <Button onClick={handleBtnClick}>{t('goOut')}</Button>
          ) : (
            null
          )}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AuthNavbar;
