import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu } from 'radix-ui';
import { logout } from '../../apis/authApis';
import { NavLink } from '../../types/homepage';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../common/Toast';
import useAuthStore from '../../stores/useAuthStore';
import { CircleCheckBig, CircleX } from 'lucide-react';
import useProfileStore from '../../stores/useProfileStore';

function Header({
  onAboutClick,
  onServiceClick,
  isSocialLoggedIn,
}: {
  onAboutClick: () => void;
  onServiceClick: () => void;
  isSocialLoggedIn: boolean;
}) {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
    const isHovered = hoveredLink !== null && hoveredLink !== 'Home';

    if (label === 'About') {
      return (
        <span
          key={to}
          className={`inline-block w-20 text-center cursor-pointer animate-slide-up ${
            isHome
              ? isHovered
                ? 'font-base'
                : 'font-bold'
              : 'hover:font-bold cursor-pointer'
          }`}
          onMouseEnter={() => setHoveredLink(label)}
          onMouseLeave={() => setHoveredLink(null)}
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
              <DropdownMenu.Separator className="m-[5px] h-px bg-indigo-200" />
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
        <span
          key={to}
          className={`inline-block w-20 text-center cursor-pointer animate-slide-up ${
            isHome
              ? isHovered
                ? 'font-base'
                : 'font-bold'
              : 'hover:font-bold cursor-pointer'
          }`}
          onMouseEnter={() => setHoveredLink(label)}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={onServiceClick}
        >
          {label}
        </span>
      );
    }

    return (
      <Link
        key={to}
        to={to}
        className={`inline-block w-20 text-center cursor-pointer animate-slide-up ${
          isHome
            ? isHovered
              ? 'font-base'
              : 'font-bold'
            : 'hover:font-bold cursor-pointer'
        }`}
        onMouseEnter={() => setHoveredLink(label)}
        onMouseLeave={() => setHoveredLink(null)}
        onClick={isHome ? undefined : handleLogin}
      >
        {label}
      </Link>
    );
  };

  return (
    <Toast.Provider>
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
            <span key={link.to} onClick={() => setHoveredLink(null)}>
              {renderLink(link)}
            </span>
          ))}
        </nav>
      </section>
    </Toast.Provider>
  );
}

export default Header;
