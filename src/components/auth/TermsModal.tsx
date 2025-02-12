import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Agreement from './Agreement';

function TermsModal() {
  const navigate = useNavigate();

  const [checked, setChecked] = useState({
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    over14: false,
  });

  const handleAgreeAllChange = () => {
    const newCheckedState = !checked.agreeAll;
    setChecked({
      agreeAll: newCheckedState,
      agreeTerms: newCheckedState,
      agreePrivacy: newCheckedState,
      over14: newCheckedState,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const isSignUpDisabled = !(
    checked.agreeTerms &&
    checked.agreePrivacy &&
    checked.over14
  );

  return (
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center gap-4 bg-gray-50 w-[25rem] h-[40rem] p-4 rounded-lg shadow-lg bg-opacity-80">
        <Link to="/login" className="absolute top-2 right-2">
          <X />
        </Link>
        <h2 className="text-3xl m-6 text-center text-zinc-900">약관동의</h2>
        <div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="agreeAll"
              checked={checked.agreeAll}
              onChange={handleAgreeAllChange}
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
              checked={checked.agreeTerms}
              onChange={handleCheckboxChange}
              className="mr-2 scale-150 accent-indigo-500 hover:accent-indigo-600 transition-all duration-300"
            />
            <label
              htmlFor="agreeTerms"
              className="text-zinc-900 cursor-pointer"
            >
              이용약관 동의 <span className="text-rose-500">(필수)</span>
            </label>
          </div>
          <Agreement type="terms" />
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="agreePrivacy"
              checked={checked.agreePrivacy}
              onChange={handleCheckboxChange}
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
              checked={checked.over14}
              onChange={handleCheckboxChange}
              className="mr-2 scale-150 accent-indigo-500 hover:accent-indigo-600 transition-all duration-300"
            />
            <label htmlFor="over14" className="text-zinc-900 cursor-pointer">
              만 14세 이상입니다. <span className="text-rose-500">(필수)</span>
            </label>
          </div>
        </div>
        <div className="flex justify-between w-full px-14">
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-gray-50 px-10 py-3 rounded-lg hover:bg-gray-500 active:bg-gray-600 transition-all duration-300 cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleSignUp}
            disabled={isSignUpDisabled}
            className={`px-7 py-3 rounded-lg transition-all duration-300 ${
              isSignUpDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 text-gray-50 hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer'
            }`}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
