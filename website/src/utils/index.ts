export * from '@utils/getBaseUrl';
export { default as DateUtils } from '@utils/dateUtils';
export { default as AuthUtils } from '@utils/authUtils';
export { default as WretchInstance } from '@utils/WretchInstance';

export const isBrowser = () => typeof window !== 'undefined';
