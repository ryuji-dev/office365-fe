import { Link, useParams } from 'react-router-dom';
import { DropdownMenu } from 'radix-ui';
import { Ellipsis, MapPinCheckInside } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { VisitorData } from '../../types/visitor';
import { getVisitorById } from '../../apis/visitorApis';

function VisitorDetailPage() {
  const statusStyles = {
    접수중: 'bg-orange-200 text-orange-500',
    접수: 'bg-blue-200 text-blue-500',
    처리완료: 'bg-green-200 text-green-600',
  };
  const { id } = useParams<{ id: string }>();

  const { data: visitor } = useQuery<VisitorData>({
    queryKey: ['visitor', id],
    queryFn: () => getVisitorById(id!),
    enabled: !!id,
  });

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
            <Link to={`/visitor/${id}`}>
              <p>Visitor Detail</p>
            </Link>
          </div>
        </header>
        <div className="flex text-zinc-900 items-start w-full">
          <div className="flex flex-col items-start mt-10 ml-[10rem] gap-2">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-3xl animate-slide-up">
                {visitor?.name}님의 방문 정보입니다.
              </h3>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <div className="border-2 border-gray-300 hover:border-indigo-300 transition-all duration-300 p-1 rounded-lg animate-slide-up cursor-pointer">
                    <Ellipsis />
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[6rem] rounded-lg bg-gray-50 p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    sideOffset={8}
                  >
                    <DropdownMenu.Item className="group cursor-pointer relative flex pt-0.5 h-8 select-none items-center rounded-sm pl-[2rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50">
                      <Link to={`/visitor/${id}/edit`}>수정</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="group cursor-pointer relative flex pt-0.5 h-8 select-none items-center rounded-sm pl-[2rem] leading-none text-indigo-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-rose-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 hover:text-gray-50">
                      삭제
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
            <span
              className={`${statusStyles['접수중']} text-sm rounded-full px-2 py-[0.063rem] animate-slide-up`}
            >
              접수중
            </span>
            <p className="text-gray-500 animate-slide-up">
              {visitor?.name} / {visitor?.phone} / {visitor?.email} /{' '}
              {visitor?.createdAt
                ? `${new Date(visitor.createdAt).getFullYear()}-${String(
                    new Date(visitor.createdAt).getMonth() + 1
                  ).padStart(2, '0')}-${String(
                    new Date(visitor.createdAt).getDate()
                  ).padStart(2, '0')} ` +
                  `${String(new Date(visitor.createdAt).getHours()).padStart(
                    2,
                    '0'
                  )}:${String(
                    new Date(visitor.createdAt).getMinutes()
                  ).padStart(2, '0')}`
                : 'N/A'}
            </p>
            <div className="w-[64rem] h-0.5 bg-gray-300 mt-2" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-[64rem] ml-[10rem] ">
          <div className="flex justify-between items-center w-[64rem] h-10 mt-4 px-8 bg-indigo-100 text-indigo-700 rounded-sm">
            <div className="flex items-center gap-2">
              <MapPinCheckInside />
              {visitor?.department}
            </div>
            <div className="flex items-center gap-2">
              <p>
                {visitor?.visitStartDate
                  ? `${new Date(visitor.visitStartDate).getFullYear()}-${String(
                      new Date(visitor.visitStartDate).getMonth() + 1
                    ).padStart(2, '0')}-${String(
                      new Date(visitor.visitStartDate).getDate()
                    ).padStart(2, '0')} 09:00`
                  : 'N/A'}{' '}
                ~{' '}
                {visitor?.visitEndDate
                  ? `${new Date(visitor.visitEndDate).getFullYear()}-${String(
                      new Date(visitor.visitEndDate).getMonth() + 1
                    ).padStart(2, '0')}-${String(
                      new Date(visitor.visitEndDate).getDate()
                    ).padStart(2, '0')} 18:00`
                  : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-[64rem] h-10 mt-4 px-4">
            <p>{visitor?.visitPurpose}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitorDetailPage;
