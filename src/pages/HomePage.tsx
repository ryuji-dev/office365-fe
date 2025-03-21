import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CalendarCheck2,
  CircleCheckBig,
  MailOpen,
  SquareParking,
} from 'lucide-react';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../components/common/Toast';
import Header from '../components/common/Header';

const ServiceText = ({ text }: { text: string }) => (
  <div className="flex items-center gap-8">
    <strong className="text-zinc-900 text-3xl font-[montserrat] animate-slide-up">
      {text}
    </strong>
  </div>
);

const IntroText = ({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) => (
  <div className={`flex items-center gap-8 ${className || ''}`}>
    <Icon className="w-20 h-20 text-indigo-900" />
    <div className="flex flex-col">
      <strong className="text-3xl animate-slide-up">{title}</strong>
      <p className="text-xl animate-slide-up">{description}</p>
    </div>
  </div>
);

function HomePage() {
  const { state } = useLocation();
  const introRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [loginProvider, setLoginProvider] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const scrollToIntroduction = () => {
    if (introRef.current) {
      introRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (introRef.current) {
        const introTexts = introRef.current.querySelectorAll('.intro-text');
        introTexts.forEach((text) => {
          const textPosition = text.getBoundingClientRect().top;
          const triggerHeight = window.innerHeight;

          if (
            textPosition < triggerHeight &&
            !text.classList.contains('animate-slide-up')
          ) {
            text.classList.add('animate-slide-up');
          }
        });

        if (
          Array.from(introTexts).every((text) =>
            text.classList.contains('animate-slide-up')
          )
        ) {
          setHasAnimated(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (state?.scrollToService) {
      serviceRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state]);

  useEffect(() => {
    const URLParams = new URLSearchParams(window.location.search);
    const loginSuccess = URLParams.get('loginSuccess');
    const provider = URLParams.get('provider');

    if (loginSuccess) {
      setLoginProvider(provider || '');
      setIsToastOpen(true);
    }
  }, []);

  const getSocialLoginMessage = () => {
    switch (loginProvider) {
      case 'google':
        return '구글 로그인에 성공했습니다.';
      case 'naver':
        return '네이버 로그인에 성공했습니다.';
      case 'kakao':
        return '카카오 로그인에 성공했습니다.';
    }
  };

  return (
    <main className="bg-zinc-900 flex flex-col justify-center mx-auto items-center relative">
      <header className="flex flex-col justify-center bg-[url('./src/assets/backgrounds/header.png')] bg-cover bg-center bg-no-repeat w-[90rem] h-[50rem]">
        <Header
          onAboutClick={scrollToIntroduction}
          onServiceClick={scrollToService}
          isSocialLoggedIn={false}
        />
        <div className="flex flex-col justify-center items-center w-full max-w-full h-full gap-8 mb-10">
          <h1 className="text-gray-50 text-9xl font-bold font-[montserrat] animate-slide-up">
            OFFICE 365
          </h1>
          <div className="bg-gray-50 h-14 flex items-center justify-center px-8">
            <span className="flex items-center gap-8">
              <ServiceText text="INVITATION" />
              <div className="w-60 h-0.5 bg-zinc-900" />
              <ServiceText text="PARKING" />
              <div className="w-60 h-0.5 bg-zinc-900" />
              <ServiceText text="RESERVATION" />
            </span>
          </div>
        </div>
        <p className="text-gray-50 text-xl font-[montserrat] pl-10 pb-8 animate-slide-up">
          CORPORATE WORK SUPPORT PLATFORM
        </p>
      </header>
      <section
        id="introduction"
        ref={introRef}
        className="bg-[url('./src/assets/backgrounds/intro.png')] bg-cover bg-center bg-no-repeat w-[90rem] h-[50rem]"
      >
        <div>
          <h2 className="text-5xl text-indigo-900 font-[montserrat] font-bold px-24 pt-20 pb-20 animate-slide-up">
            Introduction
          </h2>
          <div className="flex flex-col gap-16 justify-center ml-44 mt-8">
            <IntroText
              icon={MailOpen}
              title="Invitation"
              description="회사 방문자를 초대하고 관리할 수 있는 기능으로 초대장을 보내고 방문 일정을 쉽게 조율할 수 있습니다."
              className="intro-text"
            />
            <IntroText
              icon={SquareParking}
              title="Parking"
              description="회사 내 주차 공간을 효율적으로 관리할 수 있도록 도와주는 기능입니다. 방문자와 직원들의 주차 예약을 간편하게 처리할 수 있습니다."
              className="intro-text"
            />
            <IntroText
              icon={CalendarCheck2}
              title="Reservation"
              description="회의실 예약을 손쉽게 관리할 수 있는 기능으로 실시간 예약 현황을 확인하고 필요한 시간에 맞춰 회의실을 예약할 수 있습니다."
              className="intro-text"
            />
          </div>
          <p className="text-indigo-900 text-xl font-[montserrat] ml-[60rem] mt-[8rem] animate-slide-up">
            CORPORATE WORK SUPPORT PLATFORM
          </p>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-center bg-zinc-950 text-gray-50 w-[90rem] py-4">
        <div className="flex gap-4 py-10">
          {[
            {
              href: 'https://github.com/ryuji-dev',
              alt: 'GitHub',
              src: './src/assets/footericons/github.svg',
            },
            {
              href: 'https://www.instagram.com/elice.track.coding/',
              alt: 'Instagram',
              src: './src/assets/footericons/instagram.svg',
            },
            {
              href: 'https://elice.training/',
              alt: 'Elice',
              src: './src/assets/footericons/elice.png',
            },
          ].map((link) => (
            <a
              key={link.alt}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={link.src}
                alt={link.alt}
                className="w-10 h-10 bg-gray-50 rounded-full transition-transform duration-300 hover:scale-110 animate-slide-up"
              />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="flex text-sm gap-4">
            {[
              { href: '#', label: 'Info' },
              { href: '#', label: 'Support' },
              { href: '#', label: 'Marketing' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:underline animate-slide-up"
                onClick={(e) => e.preventDefault()}
              >
                {link.label}
              </a>
            ))}
          </p>
          <p className="flex text-sm gap-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline animate-slide-up"
            >
              Terms of Use
            </a>{' '}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline animate-slide-up"
            >
              {' '}
              Privacy Policy
            </a>
          </p>
          <p className="text-xs text-gray-400 animate-slide-up">
            Copyright ⓒ 2025 - OFFICE 365 Co. All Rights Reserved.
          </p>
        </div>
      </footer>
      <Toast.Provider>
        <ToastNotification
          open={isToastOpen}
          onOpenChange={setIsToastOpen}
          icon={CircleCheckBig}
          message={getSocialLoginMessage() || ''}
        />
        <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />
      </Toast.Provider>
    </main>
  );
}

export default HomePage;
