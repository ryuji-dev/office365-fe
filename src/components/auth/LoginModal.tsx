import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

function LoginModal() {
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
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
        </div>
        <button className="bg-indigo-500 text-gray-50 px-[9rem] py-2 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 cursor-pointer">
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
            className="w-12 h-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <img
            src="./src/assets/socialicons/naver.png"
            alt="Naver Icon"
            className="w-12 h-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <img
            src="./src/assets/socialicons/kakao.png"
            alt="Kakao Icon"
            className="w-12 h-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
