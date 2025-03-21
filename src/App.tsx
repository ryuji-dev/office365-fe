import { Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import TermsPage from './pages/auth/TermsPage';
import SignupPage from './pages/auth/SignupPage';
import MyPage from './pages/MyPage';
import VisitorPage from './pages/visitor/VisitorPage';
import SelectDepartmentPage from './pages/visitor/SelectDepartmentPage';
import RegistrationPage from './pages/visitor/RegistrationPage';
import VisitorDetailPage from './pages/visitor/VisitorDetailPage';
import VisitorEditPage from './pages/visitor/VisitorEditPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/visitor" element={<VisitorPage />} />
      <Route path="/select-department" element={<SelectDepartmentPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/visitor/:id" element={<VisitorDetailPage />} />
      <Route path="/visitor/:id/edit" element={<VisitorEditPage />} />
    </Routes>
  );
}

export default App;
