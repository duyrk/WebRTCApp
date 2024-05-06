export const CookieService = {
  get(key: string) {
    const value = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${key}=`));
    if (value) {
      return value.split('=')[1];
    } else {
      return null;
    }
  },
  set(key: string, value: string) {
    document.cookie = `${key}=${value}; path=/`;
  },
  remove(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  },
} as const;

