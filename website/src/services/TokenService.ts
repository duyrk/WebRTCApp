import { LOCAL_STORAGE_KEY } from '@constants';

export const TokenService = {
  getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  },
  setAccessToken(accessToken: string) {
    return localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  },
  getRefreshToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  },
  setRefreshToken(refreshToken: string) {
    return localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
  },
  clearTokens() {
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  },
} as const;
