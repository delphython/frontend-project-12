import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import PageNotFound from './PageNotFound';

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
