import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './PageNotFound.jsx';
import AuthContext from '../contexts/index.js';
import useAuth from '../hooks/index.js';

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

  const getAuthHeader = () => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value ={{ user, logIn, logOut, getAuthHeader }}>
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

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="/" element={(
              <MainPageRoute>
                <MainPage />
              </MainPageRoute>
            )} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;