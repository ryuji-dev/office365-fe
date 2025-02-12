import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import Agreement from './Agreement';

function TermsModal() {
  return (
    <div className="fixed inset-0 bg-[url('./src/assets/backgrounds/auth.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center gap-4 bg-gray-50 w-[25rem] h-[40rem] p-4 rounded-lg shadow-lg bg-opacity-80">
        <Link to="/login" className="absolute top-2 right-2 cursor-pointer">
          <X />
        </Link>
        <h1 className="text-3xl m-6 text-center text-zinc-900">약관동의</h1>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agreeAll"
            className="mr-2 scale-150 accent-indigo-500 hover:accent-indigo-600 transition-all duration-300"
          />
          <label htmlFor="agreeAll" className="text-zinc-900 cursor-pointer">
            이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="agreeTerms"
            className="mr-2 scale-150 accent-indigo-500 hover:accent-indigo-600 transition-all duration-300"
          />
          <label htmlFor="agreeTerms" className="text-zinc-900 cursor-pointer">
            이용약관 동의 <span className="text-rose-500">(필수)</span>
          </label>
        </div>
        <Agreement type="terms" />
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="agreePrivacy"
            className="mr-2 scale-150 accent-indigo-500 hover:accent-indigo-600 transition-all duration-300"
          />
          <label
            htmlFor="agreePrivacy"
            className="text-zinc-900 cursor-pointer"
          >
            개인정보 수집 및 이용 동의{' '}
            <span className="text-rose-500">(필수)</span>
          </label>
        </div>
        <Agreement type="privacy" />
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="over14"
            className="mr-2 scale-150 accent-indigo-500 hover:accent-indigo-600 transition-all duration-300"
          />
          <label htmlFor="over14" className="text-zinc-900 cursor-pointer">
            만 14세 이상입니다. <span className="text-rose-500">(필수)</span>
          </label>
        </div>
        <div className="flex justify-between w-full px-14">
          <button className="bg-gray-400 text-gray-50 px-10 py-3 rounded-lg hover:bg-gray-500 active:bg-gray-600 transition-all duration-300">
            취소
          </button>
          <button className="px-7 py-3 rounded-lg transition-all duration-300 bg-indigo-500 text-gray-50 hover:bg-indigo-600 active:bg-indigo-700">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
