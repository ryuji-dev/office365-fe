import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

function SignupModal() {
  return (
    <div className="fixed inset-0 bg-[url('./src/assets/backgrounds/auth.png')] bg-cover bg-center bg-no-repeat bg-opacity-50 flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center bg-gray-50 w-[25rem] h-[32rem] p-4 rounded-lg shadow-lg bg-opacity-80">
        <Link to="/" className="absolute top-2 right-2 cursor-pointer">
          <X />
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-8 text-center text-zinc-900">
          Signup
        </h1>
        <form className="flex flex-col gap-2">
          <input
            type="text"
            name="email"
            placeholder="이메일"
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
          <input
            type="text"
            name="contact"
            placeholder="연락처"
            className="w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-gray-50 px-[8.6rem] py-2 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 my-6 cursor-pointer"
          >
            가입하기
          </button>
        </form>
        <div className="flex justify-between w-full px-6">
          <div className="text-gray-500">이미 계정이 있으신가요?</div>
          <Link to="/login" className="text-indigo-500">
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
