'use client';

import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import { getBaseUrlApi } from './getBaseUrl';

export interface RequestParams {
  page?: number;
  limit?: number;
  filter?: string;
  search?: string;
  sort?: string;
}
export interface RefreshTokenResponse {
  message: string;
  data: {
    refreshToken: string;
    accessToken: string;
  };
  code: number;
}
class WretchInstance {
  static wretchInstance = wretch(getBaseUrlApi()).addon(FormDataAddon).addon(QueryStringAddon);

  static get<ResponseType>(url: string, params?: RequestParams): Promise<ResponseType> {
    return this.wretchInstance
      .url(url)
      .query(params ?? {})
      .get()
      .json() as Promise<ResponseType>;
  }
  static post<RequestType, ResponseType>(
    url: string,
    body: RequestType,
    params?: RequestParams
  ): Promise<ResponseType> {
    return this.wretchInstance
      .url(url)
      .query(params ?? {})
      .post(body)
      .json() as Promise<ResponseType>;
  }
  static put<RequestType, ResponseType>(
    url: string,
    body: RequestType,
    params?: RequestParams
  ): Promise<ResponseType> {
    return this.wretchInstance
      .url(url)
      .query(params ?? {})
      .put(body)
      .json() as Promise<ResponseType>;
  }
  static patch<RequestType, ResponseType>(
    url: string,
    body: RequestType,
    params?: RequestParams
  ): Promise<ResponseType> {
    return this.wretchInstance
      .url(url)
      .query(params ?? {})
      .patch(body)
      .json() as Promise<ResponseType>;
  }
  static delete<ResponseType>(url: string): Promise<ResponseType> {
    return this.wretchInstance.url(url).delete().json() as Promise<ResponseType>;
  }
  static postFile<ResponseType>(url: string, body: {}, headers?: Headers) {
    return this.wretchInstance
      .url(url)
      .headers({ 'Content-Type': 'multipart/form-data' })
      .post(body)
      .json() as Promise<ResponseType>;
  }
}
export default WretchInstance;
