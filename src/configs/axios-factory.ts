import {Axios, AxiosRequestConfig} from "axios";

export type RequestConfig = AxiosRequestConfig;

export const defaultAxios = (apiBaseUrl: string, options?: RequestConfig): Axios => {
  return new Axios({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    transformRequest: (data: string) => {
      if (data) {
        return JSON.stringify(data);
      }

      return data;
    },
    transformResponse: (data: string) => data ? JSON.parse(data) : '',
    ...options,
    baseURL: apiBaseUrl,
  });
};
