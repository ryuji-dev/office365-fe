import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, AlertDialog } from 'radix-ui';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../components/common/Toast';
import {
  getProfile,
  updateProfileAvatar,
  deleteUser,
} from '../apis/mypageApis';
import { ProfileResponse, UploadResponse } from '../types/mypage';
import { User } from '../types/auth';
import UpdatePasswordModal from '../components/mypage/UpdatePasswordModal';
import useProfileStore from '../stores/useProfileStore';
import useAuthStore from '../stores/useAuthStore';
import { CircleCheckBig, CircleX } from 'lucide-react';

function MyPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { data: fetchedUser } = useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
  const setProfileImage = useProfileStore((state) => state.setProfileImage);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastError, setIsToastError] = useState(false);

  const avatarMutation = useMutation<UploadResponse, Error, FormData>({
    mutationFn: (formData: FormData) => updateProfileAvatar(formData),
    onSuccess: (data) => {
      const imageURL = data.user.profileImage;
      if (imageURL) {
        setProfileImage(imageURL);
      } else {
        console.error('Failed to update profile image: URL is undefined');
      }

      setUser((prevUser) => {
        const updatedUser = prevUser
          ? { ...prevUser, profileImage: imageURL }
          : null;
        return updatedUser;
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('프로필 아바타 업데이트에 실패했습니다.', error);
    },
  });

  const deleteMutation = useMutation<void, Error>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      useAuthStore.setState({ isAuthenticated: false });
      setIsToastOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    },
    onError: (error) => {
      setIsToastError(true);
      console.error('회원 탈퇴에 실패했습니다.', error);
    },
  });

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) =>
        prevUser ? { ...prevUser, profileImage: imageUrl } : null
      );
      const formData = new FormData();

      formData.append('avatar', file);
      avatarMutation.mutate(formData);
    }
  };

  const handleDeleteAccount = async () => {
    deleteMutation.mutate();
  };

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser.user);
    }
  }, [fetchedUser]);

  return (
    <main className="bg-zinc-900 flex flex-col justify-center mx-auto items-center h-full">
      <div className="bg-[url('./src/assets/backgrounds/body.png')] flex flex-col w-[90rem] h-[100vh]">
        <header className="flex justify-between items-center h-32">
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/logo-black.png"
              alt="logo"
              className="h-32 ml-6 animate-slide-up"
            />
            <p className="text-xl font-[montserrat] animate-slide-up">
              OFFICE 365 x Elice
            </p>
          </Link>
          <div className="flex items-center gap-16 mr-16 font-bold text-xl font-[montserrat] animate-slide-up">
            <Link to="/mypage">
              <p>MyPage</p>
            </Link>
          </div>
        </header>
        <section className="flex flex-col">
          <div className="flex flex-col text-zinc-900 items-start w-full">
            <div className="flex items-center w-full my-10 ml-[18rem]">
              <h1 className="text-5xl mr-32">마이페이지</h1>
            </div>
            <div className="w-[64rem] h-0.5 bg-gray-300 mx-auto" />
          </div>
          <div className="flex gap-10 m-10 mx-auto w-[50rem]">
            <p className="text-2xl text-zinc-600 font-bold">프로필 사진</p>
            <Avatar.Root className="inline-flex size-[6.25rem] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={user?.profileImage || 'src/assets/elice.png'}
                alt="Elice"
              />
            </Avatar.Root>
            <div className="mt-auto">
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.addEventListener('change', handleFileChange);
                  input.click();
                }}
                className="bg-indigo-500 text-gray-50 px-4 h-10 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 cursor-pointer"
              >
                사진변경
              </button>
            </div>
          </div>
          <div className="flex gap-10 m-10 mx-auto w-[50rem]">
            <p className="text-2xl text-zinc-600 font-bold">이메일</p>
            <p className="text-2xl text-zinc-800 ml-11">
              {user?.email || 'user@example.com'}
            </p>
          </div>
          <div className="flex items-center gap-10 m-10 mx-auto w-[50rem]">
            <p className="text-2xl text-zinc-600 font-bold">비밀번호</p>
            <p className="text-2xl text-zinc-800 ml-6">**********</p>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="bg-indigo-500 text-gray-50 px-4 h-10 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 cursor-pointer"
            >
              비밀번호 변경
            </button>
          </div>
          <div className="flex justify-end mr-56 mt-20">
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="text-rose-400 px-4 h-10 cursor-pointer">
                  회원탈퇴
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-900 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow border-2 border-gray-300">
                  <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12 text-gray-50">
                    정말로 회원탈퇴를 하시겠습니까?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11 text-gray-400">
                    이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되며,
                    서버에서 데이터가 제거됩니다.
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-[25px]">
                    <AlertDialog.Cancel asChild>
                      <button className="inline-flex h-[35px] items-center justify-center rounded bg-gray-500 hover:bg-gray-600 active:bg-gray-700 transition-all duration-300 cursor-pointer px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none text-gray-50">
                        취소
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        onClick={handleDeleteAccount}
                        className="inline-flex h-[35px] items-center justify-center rounded bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition-all duration-300 cursor-pointer px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none text-gray-50"
                      >
                        네, 계정 삭제
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </section>
      </div>
      {isPasswordModalOpen && (
        <UpdatePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}

      <Toast.Provider>
        <ToastNotification
          open={isToastOpen}
          onOpenChange={setIsToastOpen}
          icon={CircleCheckBig}
          message="회원탈퇴에 성공했습니다."
        />
        <ToastNotification
          open={isToastError}
          onOpenChange={setIsToastError}
          icon={CircleX}
          message="회원탈퇴에 실패했습니다."
          isError={true}
        />
        <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />
      </Toast.Provider>
    </main>
  );
}

export default MyPage;
