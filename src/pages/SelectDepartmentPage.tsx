import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SelectDepartmentPage() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );

  const departments = [
    {
      name: '(주)엘리스그룹',
      imgSrc: 'src/assets/departments/elice.svg',
      imgAlt: 'elice',
      imgWidth: '10rem',
    },
    {
      name: '엘리스엔터프라이즈',
      imgSrc: 'src/assets/departments/elice-enterprise.svg',
      imgAlt: 'elice-enterprise',
      imgWidth: '14rem',
    },
    {
      name: '엘리스스쿨',
      imgSrc: 'src/assets/departments/elice-school.svg',
      imgAlt: 'elice-school',
      imgWidth: '12rem',
    },
    {
      name: '엘리스트랙',
      imgSrc: 'src/assets/departments/elice-track.svg',
      imgAlt: 'elice-track',
      imgWidth: '12rem',
    },
    {
      name: '엘카데미',
      imgSrc: 'src/assets/departments/elice-academy.svg',
      imgAlt: 'elice-academy',
      imgWidth: '14rem',
    },
  ];

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
            <p className="text-gray-500 animate-slide-up">1/2</p>
            <h3 className="text-3xl animate-slide-up">
              어떤 부서에 방문하시나요?
            </h3>
            <p className="text-gray-500 animate-slide-up">
              방문하시는 부서를 선택해주세요.
            </p>
            <div className="w-[64rem] h-0.5 bg-gray-300 mt-4" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-[64rem] ml-[10rem] gap-8">
          {departments.map((department, index) => (
            <div
              key={index}
              onClick={() => setSelectedDepartment(index)}
              className={`flex flex-col w-[calc(30%)] h-[12rem] p-4 gap-1 border-2 border-purple-300 rounded-lg transition-all duration-300 cursor-pointer ${
                selectedDepartment === index
                  ? 'bg-purple-300'
                  : 'bg-purple-100 hover:bg-purple-200'
              }`}
            >
              <div className="flex justify-start">
                <p className="text-gray-700 animate-slide-up">
                  {department.name}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={department.imgSrc}
                  alt={department.imgAlt}
                  style={{ width: department.imgWidth }}
                  className="h-[6.5rem]"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end w-[64rem] ml-[10rem] mt-20 gap-4">
          <button
            onClick={() => navigate('/visitor')}
            className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-50 px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            이전 단계
          </button>
          <button
            onClick={() => navigate('/registration')}
            className={`bg-indigo-500 text-gray-50 px-6 py-3 rounded-lg transition-all duration-300 ${
              selectedDepartment === null
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer'
            }`}
            disabled={selectedDepartment === null}
          >
            다음 단계
          </button>
        </div>
      </div>
    </section>
  );
}

export default SelectDepartmentPage;
