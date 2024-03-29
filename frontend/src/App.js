import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/> } />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
