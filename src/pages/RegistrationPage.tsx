import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegistrationPage() {
  const navigate = useNavigate();
  const [visitor] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
    <section className="bg-zinc-900 flex flex-col justify-center mx-auto items-center h-full">
      <div className="bg-[url('./src/assets/backgrounds/body.png')] flex flex-col w-[90rem] h-[100vh] overflow-y-auto">
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
            <Link to="/select-department">
              <p>Select Department</p>
            </Link>
          </div>
        </header>
        <div className="flex text-zinc-900 items-start w-full">
          <div className="flex flex-col items-start w-full my-10 ml-[10rem] gap-2">
            <p className="text-gray-500 animate-slide-up">2/2</p>
            <h3 className="text-3xl animate-slide-up">
              방문자님의 정보를 알려주세요
            </h3>
            <p className="text-gray-500 animate-slide-up">
              소속과 성함, 연락처가 관리자에게 전달됩니다.
            </p>
            <div className="w-[64rem] h-0.5 bg-gray-300 mt-4" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-[64rem] ml-[10rem] gap-8">
          <form className="flex flex-wrap justify-center w-full gap-36">
            <div className="flex flex-col gap-2 w-[35%]">
              <label htmlFor="name" className="text-gray-500">
                성함
              </label>
              <input
                type="text"
                name="name"
                // value={formData.name}
                // onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
              <label htmlFor="email" className="text-gray-500">
                이메일
              </label>
              <input
                type="text"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
              <label htmlFor="phone" className="text-gray-500">
                연락처
              </label>
              <input
                type="text"
                name="phone"
                // value={formData.phone}
                // onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2 w-[35%]">
              <label htmlFor="visitDate" className="flex gap-2 text-gray-500">
                방문 날짜
              </label>
              <div className="flex gap-2 w-[30%]">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date ?? undefined)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy/MM/dd"
                  className="flex w-28 h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
                />
                <p className="flex items-center">~</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date ?? undefined)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy/MM/dd"
                  className="w-28 h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
                />
              </div>
              <label htmlFor="visitTarget" className="text-gray-500">
                방문 대상자
              </label>
              <input
                type="text"
                name="visitTarget"
                // value={formData.visitTarget}
                // onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end w-[64rem] ml-[10rem] mt-20 gap-4">
          <button
            onClick={() => navigate('/select-department')}
            className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-50 px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            이전 단계
          </button>
          <button
            onClick={() => navigate('/visitor')}
            className={`bg-indigo-500 text-gray-50 px-6 py-3 rounded-lg transition-all duration-300 ${
              visitor === null
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer'
            }`}
            disabled={visitor === null}
          >
            다음 단계
          </button>
        </div>
      </div>
    </section>
  );
}

export default RegistrationPage;
