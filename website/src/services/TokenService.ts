import { LOCAL_STORAGE_KEY } from '@constants';
import { StorageService } from './StorageService';

export const TokenService = {
  getAccessToken() {
    return StorageService.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  },
  setAccessToken(accessToken: string) {
    return StorageService.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  },
  getRefreshToken() {
    return StorageService.get(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  },
  setRefreshToken(refreshToken: string) {
    return StorageService.set(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
  },
  clearTokens() {
    return StorageService.multipleDelete([LOCAL_STORAGE_KEY.ACCESS_TOKEN, LOCAL_STORAGE_KEY.REFRESH_TOKEN])
  },
} as const;
