import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export class requestUrl<T> {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    const createInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    createInstance.interceptors.request.use(
      (config) => config,
      (error) => {
        Promise.reject(error);
      }
    );

    createInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data) {
          return response.data;
        }
      },
      (error: AxiosError) => {
        throw error;
      }
    );

    this.instance = createInstance;
  }

  async get<R>(
    url: string,
    option?: {
      params?: T;
      headers?: any;
    }
  ): Promise<R> {
    return await this.instance.get(url, {
      params: option?.params,
      headers: option?.headers,
    });
  }

  async post<R>(
    url: string,
    option?: {
      data?: Partial<Record<keyof T, unknown>>;
      headers?: any;
    }
  ): Promise<R> {
    return await this.instance.post(url, option?.data, {
      headers: option?.headers,
    });
  }
}
