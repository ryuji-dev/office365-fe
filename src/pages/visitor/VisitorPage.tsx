import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Tabs } from 'radix-ui';
import Pagination from '@mui/material/Pagination';
import { ChevronRight, PenLine } from 'lucide-react';
import { getVisitors } from '../../apis/visitorApis';
import { VisitorData } from '../../types/visitor';

function VisitorPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('tab1');
  const itemsPerPage = 5;

  const { data: visitors = [] } = useQuery<VisitorData[]>({
    queryKey: ['visitors'],
    queryFn: async () => {
      const response = await getVisitors();
      const visitorMap = new Map<string, VisitorData>();

      Object.values(response).forEach((visitor) => {
        if (!visitorMap.has(visitor._id)) {
          const formattedVisitDate = new Date(visitor.visitStartDate);
          visitorMap.set(visitor._id, {
            ...visitor,
            visitStartDate: formattedVisitDate,
          });
        }
      });

      const sortedVisitors = Array.from(visitorMap.values()).sort((a, b) => {
        return (
          new Date(a.visitStartDate).getTime() -
          new Date(b.visitStartDate).getTime()
        );
      });

      return sortedVisitors;
    },
  });

  const totalItemsTab1 = visitors.filter(
    (visitor) => visitor.status !== '처리완료'
  ).length;
  const totalItemsTab2 = visitors.filter(
    (visitor) => visitor.status === '처리완료'
  ).length;
  const totalPagesTab1 = Math.ceil(totalItemsTab1 / itemsPerPage);
  const totalPagesTab2 = Math.ceil(totalItemsTab2 / itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleVisitorClick = (visitorId: string) => {
    navigate(`/visitor/${visitorId}`);
  };

  // statusStyles 정의
  const statusStyles = {
    접수중: 'bg-orange-200 text-orange-500',
    접수: 'bg-blue-200 text-blue-500',
    처리완료: 'bg-green-200 text-green-600',
  };

  // 사용자가 관리자임을 결정하는 boolean 값
  const isAdmin = false; // 실제 관리자 상태를 결정하는 로직으로 대체

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
            <Link to="/visitor">
              <p>Visitor</p>
            </Link>
          </div>
        </header>
        <div className="flex text-zinc-900 items-start w-full">
          <div className="flex flex-col items-start w-full my-10 ml-[10rem] gap-4">
            <h1 className="text-5xl font-[montserrat] font-bold animate-slide-up">
              방문 접수
            </h1>
            <p className="text-gray-500 ml-1 animate-slide-up">
              귀하의 방문을 환영합니다.
            </p>
            <button
              onClick={() => navigate('/select-department')}
              className="flex items-center gap-2 bg-indigo-500 text-gray-50 px-6 py-3 mt-4 rounded-lg hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 cursor-pointer animate-slide-up"
            >
              <PenLine className="w-5 h-5" />
              접수하기
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-start w-full my-10 ml-[10rem] gap-8">
            <h2 className="text-2xl animate-slide-up">
              엘리스님이 접수한 내역
            </h2>
            <Tabs.Root
              className="flex w-[68.75rem] flex-col"
              defaultValue="tab1"
              onValueChange={(value) => setTab(value)}
            >
              <Tabs.List
                className="flex shrink-0 border-b border-gray-300"
                aria-label="Manage your account"
              >
                <Tabs.Trigger
                  className="flex h-[3.125rem] flex-1 cursor-pointer select-none items-center justify-center px-5 text-xl leading-none text-gray-400 outline-none hover:text-indigo-600 data-[state=active]:text-indigo-700 transition-all duration-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:focus:shadow-indigo-700"
                  value="tab1"
                >
                  접수
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="flex h-[3.125rem] flex-1 cursor-pointer select-none items-center justify-center px-5 text-xl leading-none text-gray-400 outline-none hover:text-indigo-600 data-[state=active]:text-indigo-700 transition-all duration-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:focus:shadow-indigo-700"
                  value="tab2"
                >
                  처리완료
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content className="grow outline-none" value="tab1">
                <div className="flex flex-col min-h-[15.6rem]">
                  {visitors
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((visitor) => (
                      <div
                        key={visitor._id}
                        onClick={() => handleVisitorClick(visitor._id)}
                        className="flex justify-between text-zinc-900 hover:bg-indigo-950/10 transition-all duration-300 px-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-8">
                          <div className="flex justify-center w-20">
                            <span
                              className={`${
                                statusStyles[
                                  visitor.status as keyof typeof statusStyles
                                ]
                              } text-sm rounded-full px-2 py-[0.063rem]`}
                            >
                              {visitor.status}
                            </span>
                          </div>
                          <p className="flex items-center h-[3.125rem]">
                            {new Date(
                              visitor.visitStartDate
                            ).toLocaleDateString('ko-KR', {
                              month: 'long',
                              day: 'numeric',
                            })}
                            에 {visitor.department} 부서 방문 접수합니다.
                          </p>
                        </div>
                        <div className="flex items-center gap-8 text-gray-500">
                          <p>{visitor.department}</p>
                          <p>
                            {
                              new Date(visitor.visitStartDate)
                                .toISOString()
                                .split('T')[0]
                            }
                          </p>
                          <ChevronRight className="text-zinc-900" />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-center w-full mt-4">
                  <Pagination
                    count={totalPagesTab1}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
              </Tabs.Content>
              <Tabs.Content className="grow outline-none" value="tab2">
                {isAdmin ? (
                  <div className="flex flex-col min-h-[15.6rem]">
                    {visitors
                      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                      .map((visitor, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-zinc-900 px-4 cursor-pointer"
                        >
                          <div className="flex items-center gap-8">
                            <div className="flex justify-center w-20">
                              <span className="bg-green-200 text-sm text-green-600 rounded-full px-2 py-[0.063rem]">
                                처리완료
                              </span>
                            </div>
                            <p className="flex items-center h-[3.125rem]">
                              {new Date(
                                visitor.visitStartDate
                              ).toLocaleDateString('ko-KR')}
                              에 {visitor.department} 부서 방문 접수합니다.
                            </p>
                          </div>
                          <div className="flex items-center gap-8 text-gray-500">
                            <p>{visitor.department}</p>
                            <p>
                              {new Date(
                                visitor.visitStartDate
                              ).toLocaleDateString('ko-KR')}
                            </p>
                            <ChevronRight className="text-zinc-900" />
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="flex items-center justify-center text-center text-gray-500 h-[15.6rem]">
                    관리자의 승인 후에 처리완료 내역을 확인할 수 있습니다.
                  </p>
                )}
                <div className="flex justify-center w-full mt-4">
                  <Pagination
                    count={totalPagesTab2}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitorPage;
