import Header from '../components/common/Header';

const ServiceText = ({ text }: { text: string }) => (
  <div className="flex items-center gap-8 animate-slide-up">
    <strong className="text-zinc-900 text-3xl font-[montserrat]">{text}</strong>
  </div>
);

function HomePage() {
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
    </main>
  );
}

export default HomePage;
