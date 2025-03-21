import { useState } from 'react';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../common/Toast';
import { CircleCheckBig, CircleX, X } from 'lucide-react';
import { updatePassword } from '../../apis/mypageApis';
import { UpdatePasswordModalProps } from '../../types/mypage';

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력하세요.'),
    newPassword: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[a-z]/, '비밀번호는 영문 소문자를 포함해야 합니다.')
      .regex(/[A-Z]/, '비밀번호는 영문 대문자를 포함해야 합니다.')
      .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
      .regex(/[^a-zA-Z0-9]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

function UpdatePasswordModal({ onClose }: UpdatePasswordModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastError, setIsToastError] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      passwordConfirm: string;
    }) =>
      updatePassword(
        data.currentPassword,
        data.newPassword,
        data.passwordConfirm
      ),
    onSuccess: () => {
      setIsToastOpen(true);
      setTimeout(() => {
        onClose();
        navigate('/mypage');
      }, 1000);
    },
    onError: (error) => {
      setIsToastError(true);
      console.error('비밀번호 변경에 실패했습니다.', error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const currentErrors = {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    };

    if (!formData.currentPassword)
      currentErrors.currentPassword = '현재 비밀번호를 입력하세요.';
    if (!formData.newPassword)
      currentErrors.newPassword = '새 비밀번호를 입력하세요.';
    if (!formData.passwordConfirm)
      currentErrors.passwordConfirm = '새 비밀번호를 다시 한 번 입력하세요.';
    if (formData.newPassword !== formData.passwordConfirm)
      currentErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';

    try {
      updatePasswordSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        currentErrors.currentPassword =
          fieldErrors.currentPassword?.[0] || currentErrors.currentPassword;
        currentErrors.newPassword =
          fieldErrors.newPassword?.[0] || currentErrors.newPassword;
        currentErrors.passwordConfirm =
          fieldErrors.passwordConfirm?.[0] || currentErrors.passwordConfirm;
      }
    }

    setErrors(currentErrors);

    if (
      !currentErrors.currentPassword &&
      !currentErrors.newPassword &&
      !currentErrors.passwordConfirm
    ) {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/50">
      <div className="relative flex flex-col items-center justify-center bg-gray-50 w-[25rem] h-[27rem] p-4 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <X />
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900">
          비밀번호 변경
        </h1>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="currentPassword"
            placeholder="현재 비밀번호"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.currentPassword ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.currentPassword && (
            <p className="text-rose-500 text-sm">{errors.currentPassword}</p>
          )}
          <input
            type="password"
            name="newPassword"
            placeholder="새 비밀번호"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.currentPassword ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.newPassword && (
            <p className="text-rose-500 text-sm">{errors.newPassword}</p>
          )}
          <input
            type="password"
            name="passwordConfirm"
            placeholder="새 비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`w-[20.6rem] h-10 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 ${
              errors.passwordConfirm ? 'border-rose-300' : 'border-gray-300'
            }`}
          />
          {errors.passwordConfirm && (
            <p className="text-rose-500 text-sm">{errors.passwordConfirm}</p>
          )}
        </div>
        <div className="h-4" />
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 text-gray-50 px-[6.84rem] py-2 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 cursor-pointer"
        >
          비밀번호 변경하기
        </button>
      </div>

      <Toast.Provider>
        <ToastNotification
          open={isToastOpen}
          onOpenChange={setIsToastOpen}
          icon={CircleCheckBig}
          message="비밀번호가 변경되었습니다."
        />
        <ToastNotification
          open={isToastError}
          onOpenChange={setIsToastError}
          icon={CircleX}
          message="비밀번호 변경에 실패했습니다. 다시 시도해주세요."
          isError={true}
        />
        <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />
      </Toast.Provider>
    </div>
  );
}

export default UpdatePasswordModal;
