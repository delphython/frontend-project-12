// eslint-disable-next-line react/jsx-no-constructed-context-values

import React, { useState, useMemo } from 'react';
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

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const obj = useMemo(() => {
    const logIn = (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser({ username: userData.username });
    };

    const logOut = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    const getAuthHeader = () => {
      if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
      }
      return {};
    };

    return {
      user,
      logIn,
      logOut,
      getAuthHeader,
    };
  }, [user, currentUser]);

  return (
    <AuthContext.Provider
      value={obj}
    >
      {children}
    </AuthContext.Provider>
  );
};

const MainPageRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.user ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <MainPageRoute>
                <MainPage />
              </MainPageRoute>
          )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
