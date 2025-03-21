import { useState, useEffect } from 'react';

const useCookie = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const value =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split('=')[1] || null;
    setCookieValue(value);
  }, [cookieName]);

  const setCookie = (value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${cookieName}=${value}; expires=${expires}; path=/`;
  };

  const deleteCookie = () => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
    setCookieValue(null);
  };

  return { cookieValue, setCookie, deleteCookie };
};

export default useCookie;
