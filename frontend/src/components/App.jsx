/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import MainPage from './MainPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';
import { routes } from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getToken = () => {
    if (currentUser && currentUser.token) {
      return currentUser.token;
    }

    return {};
  };

  return (
    <AuthContext.Provider value={{
      user,
      logIn,
      logOut,
      getToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const MainPageRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.user ? children : <Navigate to={routes.loginPath()} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path={routes.rootPath()}
            element={(
              <MainPageRoute>
                <MainPage />
              </MainPageRoute>
          )}
          />
          <Route path={routes.loginPath()} element={<LoginPage />} />
          <Route path={routes.signupPath()} element={<RegistrationPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
