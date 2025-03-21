import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { z } from 'zod';
import * as Toast from '@radix-ui/react-toast';
import ToastNotification from '../../components/common/Toast';
import { VisitorData, VisitorInfo } from '../../types/visitor';
import { getVisitorById, postVisitorInfo } from '../../apis/visitorApis';
import useDepartmentStore from '../../stores/useDepartmentStore';
import { CircleCheckBig, CircleX, PenLine } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  email: z.string().email({ message: '이메일 형식으로 입력해주세요.' }),
  phone: z
    .string()
    .refine(
      (value) => {
        const cleanedValue = value.replace(/-/g, '');
        return cleanedValue.length === 11;
      },
      {
        message: '연락처는 11자리 숫자여야 합니다.',
      }
    )
    .refine(
      (value) =>
        /^\d{3}-\d{4}-\d{4}$/.test(value) ||
        value.replace(/-/g, '').length === 11,
      {
        message: '연락처 형식이 올바르지 않습니다.',
      }
    ),
  visitStartDate: z.date(),
  visitEndDate: z.date(),
  visitTarget: z.string().min(1, { message: '방문 대상자를 입력해주세요.' }),
  visitPurpose: z.string().min(1, { message: '방문 목적을 입력해주세요.' }),
});

function VisitorEditPage() {
  const navigate = useNavigate();
  const department = useDepartmentStore((state) => state.department);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState<z.infer<typeof formSchema>>({
    name: '',
    email: '',
    phone: '',
    visitStartDate: new Date(),
    visitEndDate: new Date(),
    visitTarget: '',
    visitPurpose: '',
  });
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastError, setIsToastError] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { data: visitorData } = useQuery<VisitorData>({
    queryKey: ['visitor', id],
    queryFn: () => getVisitorById(id!),
    enabled: !!id,
  });

  const mutation = useMutation<void, Error, VisitorInfo>({
    mutationFn: (data: VisitorInfo) => postVisitorInfo(data),
    onSuccess: () => {
      setIsToastOpen(true);
      setTimeout(() => {
        navigate('/visitor');
      }, 1000);
    },
    onError: (error: Error) => {
      setIsToastError(true);
      console.error('방문자 정보 전송 중 에러가 발생했습니다.', error);
    },
  });

  useEffect(() => {
    if (visitorData) {
      setFormData({
        name: visitorData.name,
        email: visitorData.email,
        phone: visitorData.phone,
        visitStartDate: new Date(visitorData.visitStartDate),
        visitEndDate: new Date(visitorData.visitEndDate),
        visitTarget: visitorData.visitTarget,
        visitPurpose: visitorData.visitPurpose,
      });
      setStartDate(new Date(visitorData.visitStartDate));
      setEndDate(new Date(visitorData.visitEndDate));
    }
  }, [visitorData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // 연락처 입력 처리
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      let formattedValue = numericValue;

      if (numericValue.length > 3) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
      }
      if (numericValue.length > 7) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          7
        )}-${numericValue.slice(7, 11)}`;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    }
  };

  const handleDateChange = (date: Date | null, isStart: boolean) => {
    if (date) {
      if (isStart) {
        setStartDate(date);
        setFormData({ ...formData, visitStartDate: date });
      } else {
        setEndDate(date);
      }
    }
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      mutation.mutate({
        ...formData,
        department,
        visitStartDate: startDate,
        visitEndDate: endDate,
        createdAt: new Date(),
      });
    }
  };

  const isFormValid = () => {
    try {
      formSchema.parse(formData);

      return Object.values(formData).every((value) =>
        typeof value === 'string' ? value.trim() !== '' : true
      );
    } catch {
      return false;
    }
  };

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
            <Link to={`/visitor/${id}/edit`}>
              <p>Visitor</p>
            </Link>
          </div>
        </header>
        <div className="flex text-zinc-900 items-start w-full">
          <div className="flex flex-col items-start w-full my-10 ml-[10rem] gap-2">
            <div className="flex justify-between items-center w-[64rem] h-10 mb-8 px-8 bg-rose-200 text-rose-700 rounded-sm animate-slide-up">
              <div className="flex items-center gap-2">
                <PenLine />
                <p>현재 방문자 정보를 수정하고 있습니다.</p>
              </div>
              <button
                onClick={() => navigate(`/visitor/${id}`)}
                className="underline cursor-pointer"
              >
                수정취소
              </button>
            </div>
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
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
              <label htmlFor="email" className="text-gray-500">
                이메일
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
              <label htmlFor="phone" className="text-gray-500">
                연락처
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
                  onChange={(date) => handleDateChange(date, true)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  className="flex w-28 h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
                />
                <p className="flex items-center">~</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => handleDateChange(date, false)}
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
                value={formData.visitTarget}
                onChange={handleChange}
                className="w-full h-10 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2 w-[84%] mt-[-8.5rem]">
              <label htmlFor="visitPurpose" className="text-gray-500">
                방문 목적
              </label>
              <textarea
                name="visitPurpose"
                value={formData.visitPurpose}
                onChange={handleChange}
                className="w-full h-30 bg-gray-50 border-2 rounded-lg p-2 focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 border-gray-300"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end w-[64rem] ml-[10rem] mt-26 mb-8">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`bg-indigo-500 text-gray-50 px-6 py-3 rounded-lg transition-all duration-300 ${
              !isFormValid()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer'
            }`}
          >
            수정 완료
          </button>
        </div>
      </div>

      <Toast.Provider>
        <ToastNotification
          open={isToastOpen}
          onOpenChange={setIsToastOpen}
          icon={CircleCheckBig}
          message="방문 접수 수정이 완료되었습니다."
        />
        <ToastNotification
          open={isToastError}
          onOpenChange={setIsToastError}
          icon={CircleX}
          message="방문 접수 수정 중 오류가 발생했습니다."
          isError={true}
        />
        <Toast.Viewport className="fixed top-0 right-0 z-50 p-4" />
      </Toast.Provider>
    </section>
  );
}

export default VisitorEditPage;
