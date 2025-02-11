import { useRef } from 'react';
import Header from '../components/common/Header';
import { CalendarCheck2, MailOpen, SquareParking } from 'lucide-react';

const ServiceText = ({ text }: { text: string }) => (
  <div className="flex items-center gap-8">
    <strong className="text-zinc-900 text-3xl font-[montserrat]">{text}</strong>
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
      <strong className="text-3xl">{title}</strong>
      <p className="text-xl">{description}</p>
    </div>
  </div>
);

function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-zinc-900 flex flex-col justify-center mx-auto items-center relative">
      <header className="flex flex-col justify-center bg-[url('./src/assets/backgrounds/header.png')] bg-cover bg-center bg-no-repeat w-[90rem] h-[50rem]">
        <Header
          onAboutClick={() => {}}
          onServiceClick={() => {}}
          isSocialLoggedIn={false}
        />
        <div className="flex flex-col justify-center items-center w-full max-w-full h-full gap-8 mb-10">
          <h1 className="text-gray-50 text-9xl font-bold font-[montserrat]">
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
        <p className="text-gray-50 text-xl font-[montserrat] pl-10 pb-8">
          CORPORATE WORK SUPPORT PLATFORM
        </p>
      </header>
      <div
        id="introduction"
        ref={introRef}
        className="bg-[url('./src/assets/backgrounds/intro.png')] bg-cover bg-center bg-no-repeat w-[90rem] h-[50rem]"
      >
        <section>
          <h2 className="text-5xl text-indigo-900 font-[montserrat] font-bold px-24 pt-20 pb-20">
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
        </section>
      </div>
    </main>
  );
}

export default HomePage;
