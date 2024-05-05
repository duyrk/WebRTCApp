import wretch from 'wretch';
import { TokenService } from 'services';
import { getBaseUrlApi } from './getBaseUrl';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Authorization', `Bearer ${TokenService.getAccessToken()}`);

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
  static wretchInstance = wretch(getBaseUrlApi())
    .addon(FormDataAddon)
    .addon(QueryStringAddon)
    .catcher(401, async (error, request) => {
      const res = await wretch('/renewToken')
        .get()
        .json((json) => json as RefreshTokenResponse);
      TokenService.setAccessToken(res.data.accessToken);
      TokenService.setRefreshToken(res.data.refreshToken);
      return request
        .auth(TokenService.getAccessToken() ?? '')
        .fetch()
        .unauthorized((err) => {
          throw err;
        })
        .json();
    });
  static get<ResponseType>(url: string, params?: RequestParams): Promise<ResponseType> {
    return this.wretchInstance
      .url(url)
      .headers(headers)
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
      .headers(headers)
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
      .headers(headers)
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
      .headers(headers)
      .query(params ?? {})
      .patch(body)
      .json() as Promise<ResponseType>;
  }
  static delete<ResponseType>(url: string): Promise<ResponseType> {
    return this.wretchInstance.url(url).headers(headers).delete().json() as Promise<ResponseType>;
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
