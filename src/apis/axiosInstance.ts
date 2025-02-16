import axios from 'axios';

// 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('요청 오류: ', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

    if (error.response) {
      console.error('응답 오류: ', error.response?.data || error.message);
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      console.error('요청 오류: ', error.request);
      errorMessage = '서버로부터 응답이 없습니다. 나중에 다시 시도해 주세요.';
    } else {
      console.error('요청 설정 오류: ', error.message);
      errorMessage = `요청 설정 오류: ${error.message}`;
    }

    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
