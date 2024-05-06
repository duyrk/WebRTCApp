export * from '@utils/getBaseUrl';
export { default as DateUtils } from '@utils/dateUtils';
import { getBaseUrl, getBaseUrlApi } from '@utils/getBaseUrl';
export { default as WretchInstance } from '@utils/WretchInstance';
export { default as AuthUtils } from '@utils/authUtils';
export const isBrowser = () => typeof window !== 'undefined';
