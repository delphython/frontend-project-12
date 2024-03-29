import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/> } />
          <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
