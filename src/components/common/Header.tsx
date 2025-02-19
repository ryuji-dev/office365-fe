import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu } from 'radix-ui';
import { logout } from '../../apis/authApis';
import { NavLink } from '../../types/homepage';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../common/Toast';
import useAuthStore from '../../stores/useAuthStore';
import { CircleCheckBig, CircleX, KeyRound, X } from 'lucide-react';
import useProfileStore from '../../stores/useProfileStore';

function Header({
  onAboutClick,
  isSocialLoggedIn,
}: {
  onAboutClick: () => void;
  onServiceClick: () => void;
  isSocialLoggedIn: boolean;
}) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    useAuthStore.getState().isAuthenticated
  );
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastError, setIsToastError] = useState(false);
  const profileImage = useProfileStore((state) => state.profileImage);
  const setProfileImage = useProfileStore((state) => state.setProfileImage);
  const adjustedProfileImage = profileImage?.startsWith('http')
    ? profileImage
    : `http://localhost:3000/${profileImage}`;
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setProfileImage('http://localhost:5173/src/assets/elice.png');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setIsToastOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('로그아웃 실패', error);
      setIsToastError(true);
    }
  };

  const handleServiceClick = () => {
    setActiveLink(activeLink === 'Service' ? null : 'Service');
  };

  const handleProtectedLinkClick = (event: React.MouseEvent, link: string) => {
    if (!isLoggedIn) {
      event.preventDefault();
      setShowModal(true);
    } else {
      navigate(link);
    }
  };

  const links: NavLink[] = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/service', label: 'Service' },
    {
      to: isLoggedIn ? '/profile' : isSocialLoggedIn ? '/profile' : '/login',
      label: isLoggedIn ? 'Profile' : isSocialLoggedIn ? 'Profile' : 'Login',
    },
  ];

  const renderLink = ({ to, label }: NavLink) => {
    const isHome = label === 'Home';
    const isActive = activeLink === label;

    const baseClass =
      'inline-block w-20 text-center cursor-pointer animate-slide-up transition-transform duration-300';
    const hoverClass = 'hover:scale-[1.1]';

    if (label === 'About') {
      return (
        <span
          key={to}
          className={`${baseClass} ${hoverClass}`}
          onClick={onAboutClick}
        >
          {label}
        </span>
      );
    }

    if (label === 'Profile') {
      return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="inline-flex size-[3.125rem] items-center justify-center overflow-hidden rounded-full bg-gray-50 text-indigo-500 border-2 border-indigo-300 hover:border-indigo-500 transition-all duration-300 ease animate-slide-up cursor-pointer"
              aria-label="Customise options"
            >
              <img
                src={adjustedProfileImage || '/src/assets/elice.png'}
                alt="Elice"
                className="rounded-full"
              />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[10rem] rounded-lg bg-gray-50 p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
              sideOffset={8}
            >
              <DropdownMenu.Item className="group cursor-pointer relative flex pt-0.5 h-8 select-none items-center rounded-sm pl-[2.7rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50">
                <Link to="/mypage">마이페이지</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="group cursor-pointer relative flex h-8 select-none items-center rounded-sm pl-[3.1rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50"
                onClick={handleLogout}
              >
                로그아웃
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      );
    }

    if (label === 'Service') {
      return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <span
              key={to}
              className={`${baseClass} ${hoverClass} ${
                isActive ? 'font-bold' : ''
              }`}
              onClick={handleServiceClick}
            >
              {label}
            </span>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[10rem] rounded-lg bg-gray-50 p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              sideOffset={8}
            >
              <DropdownMenu.Item
                className="group cursor-pointer relative flex pt-0.5 h-8 select-none items-center rounded-sm pl-[3rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50"
                onClick={(e) => handleProtectedLinkClick(e, '/visitor')}
              >
                방문 접수
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="group cursor-pointer relative flex pt-0.5 h-8 select-none items-center rounded-sm pl-[3rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50"
                onClick={(e) => handleProtectedLinkClick(e, '/parking')}
              >
                주차 등록
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="group cursor-pointer relative flex pt-0.5 h-8 select-none items-center rounded-sm pl-[2.5rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50"
                onClick={(e) => handleProtectedLinkClick(e, '/meeting-room')}
              >
                회의실 예약
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      );
    }

    return (
      <Link
        key={to}
        to={to}
        className={`${baseClass} ${hoverClass}`}
        onClick={isHome ? undefined : handleLogin}
      >
        {label}
      </Link>
    );
  };

  return (
    <Toast.Provider>
      {showModal && (
        <div className="fixed inset-0 bg-zinc-900/50 flex justify-center items-center z-50">
          <div
            className="bg-gray-50 p-4 rounded-lg relative border-2 border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to="/"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <X />
            </Link>
            <div className="p-4">
              <h2 className="flex items-center text-xl font-bold gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500">
                  <KeyRound className="text-gray-50" />
                </div>
                로그인이 필요합니다
              </h2>
              <p className="text-gray-500">
                이 페이지에 접근하려면{' '}
                <span className="text-indigo-500">로그인</span>이 필요합니다.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-500 text-gray-50 px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => navigate('/login')}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastNotification
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
        icon={CircleCheckBig}
        message="OFFICE 365에 로그아웃 되었습니다."
      />
      <ToastNotification
        open={isToastError}
        onOpenChange={setIsToastError}
        icon={CircleX}
        message="로그아웃에 실패했습니다."
        isError={true}
      />
      <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />

      <section className="flex text-gray-50 justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/logo-white.png"
            alt="logo"
            className="h-32 ml-6 animate-slide-up"
          />
          <p className="text-xl font-[montserrat] animate-slide-up">
            OFFICE 365 x Elice
          </p>
        </Link>
        <nav className="flex items-center gap-16 mr-16 font-light text-xl font-[montserrat]">
          {links.map((link) => (
            <span key={link.to}>{renderLink(link)}</span>
          ))}
        </nav>
      </section>
    </Toast.Provider>
  );
}

export default Header;
