import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleCheckBig, CircleX, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../common/Toast';
import { login } from '../../apis/authApis';
import { LoginResponse, LoginRequest } from '../../types/auth';
import useCookie from '../../hooks/useCookie';
import useAuthStore from '../../stores/useAuthStore';

function LoginModal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastError, setIsToastError] = useState(false);

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: () => {
      setIsToastOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    },
    onError: (error) => {
      console.error('로그인 오류:', error);
      setIsToastError(true);
    },
  });

  const handleLogin = () => {
    mutation.mutate({ email, password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const { cookieValue: userCookie } = useCookie('user');

  const handleGoogleLogin = () => {
    const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = 'email%20profile';
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
    window.location.href = authURL;

    const user = JSON.parse(userCookie || '{}');
    useAuthStore.getState().socialLogin(user);
  };

  const handleNaverLogin = () => {
    const clientID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const state = 'random_state_string';
    const authURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`;
    window.location.href = authURL;

    const user = JSON.parse(userCookie || '{}');
    useAuthStore.getState().socialLogin(user);
  };

  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const authURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;
    window.location.href = authURL;

    const user = JSON.parse(userCookie || '{}');
    useAuthStore.getState().socialLogin(user);
  };

  return (
    <div className="fixed inset-0 bg-[url('./src/assets/backgrounds/auth.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center gap-4 bg-gray-50 w-[25rem] h-[31.25rem] p-4 rounded-lg shadow-lg opacity-[.95]">
        <Link to="/" className="absolute top-2 right-2 cursor-pointer">
          <X />
        </Link>
        <h1 className="text-3xl font-bold m-8 text-center text-zinc-900">
          Login
        </h1>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-indigo-500 text-gray-50 px-[9rem] py-2 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 cursor-pointer"
        >
          로그인
        </button>
        <div className="flex justify-between w-full px-6">
          <Link to="/terms" className="text-zinc-900">
            회원가입
          </Link>
          <Link to="/find-account" className="text-zinc-900">
            아이디 · 비밀번호 찾기
          </Link>
        </div>
        <div className="h-0.5" />
        <span className="flex items-center justify-center w-full">
          <div className="w-32 h-[0.0625rem] bg-gray-400" />
          <span className="mx-6 text-zinc-900">또는</span>
          <div className="w-32 h-[0.0625rem] bg-gray-400" />
        </span>
        <div className="flex items-center justify-center gap-12 mb-4">
          <img
            src="./src/assets/socialicons/google.svg"
            alt="Google Icon"
            onClick={handleGoogleLogin}
            className="w-12 h-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <img
            src="./src/assets/socialicons/naver.png"
            alt="Naver Icon"
            onClick={handleNaverLogin}
            className="w-12 h-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <img
            src="./src/assets/socialicons/kakao.png"
            alt="Kakao Icon"
            onClick={handleKakaoLogin}
            className="w-12 h-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
      <Toast.Provider>
        <ToastNotification
          open={isToastOpen}
          onOpenChange={setIsToastOpen}
          icon={CircleCheckBig}
          message="로그인에 성공했습니다."
        />
        <ToastNotification
          open={isToastError}
          onOpenChange={setIsToastError}
          icon={CircleX}
          message="로그인에 실패했습니다."
          isError={true}
        />
        <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />
      </Toast.Provider>
    </div>
  );
}

export default LoginModal;
