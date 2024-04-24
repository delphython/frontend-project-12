import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import { routes } from '../routes.js';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.rootPath()}>Hexlet Chat</Navbar.Brand>
        {auth.user ? <Button onClick={auth.logOut}>{t('logout')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
