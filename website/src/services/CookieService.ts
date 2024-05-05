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
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 1);
    const formattedExpirationDate = expirationDate.toUTCString();
    document.cookie = `${key}=; expires=${formattedExpirationDate}; path=/`;
  },
} as const;
