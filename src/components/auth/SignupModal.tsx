import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleCheckBig, CircleX, X } from 'lucide-react';
import { z } from 'zod';
import { signup } from '../../apis/authApis';
import { useMutation } from '@tanstack/react-query';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../common/Toast';
import { SignupRequest, SignupResponse } from '../../types/auth';

const signupSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력하세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[a-z]/, '비밀번호는 영문 소문자를 포함해야 합니다.')
      .regex(/[A-Z]/, '비밀번호는 영문 대문자를 포함해야 합니다.')
      .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
      .regex(/[^a-zA-Z0-9]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    passwordConfirm: z.string(),
    contact: z
      .string()
      .refine(
        (value) => {
          const cleanedValue = value.replace(/-/g, '');
          return cleanedValue.length === 11;
        },
        {
          message: '연락처는 11자리 숫자여야 합니다.',
        }
      )
      .refine(
        (value) =>
          /^\d{3}-\d{4}-\d{4}$/.test(value) ||
          value.replace(/-/g, '').length === 11,
        {
          message: '연락처 형식이 올바르지 않습니다.',
        }
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

function SignupModal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupRequest>({
    email: '',
    password: '',
    passwordConfirm: '',
    contact: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    contact: '',
  });
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastError, setIsToastError] = useState(false);

  const mutation = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
    onSuccess: () => {
      setIsToastOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    },
    onError: (error: Error) => {
      console.error('회원가입 오류:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '이메일이 이미 존재합니다.',
      }));
      setIsToastError(true);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 연락처 입력 처리
    if (name === 'contact') {
      const numericValue = value.replace(/\D/g, '');
      let formattedValue = numericValue;

      if (numericValue.length > 3) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
      }
      if (numericValue.length > 7) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          7
        )}-${numericValue.slice(7, 11)}`;
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);
      mutation.mutate(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0] || '',
          password: fieldErrors.password?.[0] || '',
          passwordConfirm: fieldErrors.passwordConfirm?.[0] || '',
          contact: fieldErrors.contact?.[0] || '',
        });
      } else {
        console.error('회원가입 오류:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('./src/assets/backgrounds/auth.png')] bg-cover bg-center bg-no-repeat bg-opacity-50 flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center bg-gray-50 w-[25rem] h-[35rem] p-4 rounded-lg shadow-lg bg-opacity-80">
        <Link to="/" className="absolute top-2 right-2 cursor-pointer">
          <X />
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-8 text-center text-zinc-900">
          Signup
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className={`w-[20.6rem] h-10 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.email ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-rose-500 mb-1 text-sm">{errors.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className={`w-[20.6rem] h-10 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.password ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-rose-500 mb-1 text-sm">{errors.password}</p>
          )}
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className={`w-[20.6rem] h-10 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.passwordConfirm ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.passwordConfirm && (
            <p className="text-rose-500 mb-1 text-sm">
              {errors.passwordConfirm}
            </p>
          )}
          <input
            type="text"
            name="contact"
            placeholder="연락처"
            value={formData.contact}
            onChange={handleChange}
            className={`w-[20.6rem] h-10 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.contact ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.contact && (
            <p className="text-rose-500 mb-1 text-sm">{errors.contact}</p>
          )}
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
      <ToastNotification
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
        icon={CircleCheckBig}
        message="환영합니다 🎉 회원가입이 완료되었습니다."
      />
      <ToastNotification
        open={isToastError}
        onOpenChange={setIsToastError}
        icon={CircleX}
        message="회원가입에 실패했습니다."
        isError
      />
      <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />
    </div>
  );
}

export default SignupModal;
