import { Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import VisitorPage from './pages/VisitorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/visitor" element={<VisitorPage />} />
    </Routes>
  );
}

export default App;
