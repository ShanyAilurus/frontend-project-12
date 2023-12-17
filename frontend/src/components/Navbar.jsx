import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import route from '../route';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.logIn && <Button className="btn-primary" onClick={auth.logOut}>{t('goOut')}</Button>;
};

const AuthNavbar = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to={route.chat}>{t('mainHeader')}</Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AuthNavbar;
