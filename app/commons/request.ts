import axios, { type AxiosRequestConfig } from 'axios';
import { MessagePlugin } from 'tdesign-react';
import { createMockAdapter } from 'vite-plugin-mock-data/axios-adapter';
import i18n from '~/i18n';
import { useUserStore } from '~/store';

/** 错误提示：TDesign MessagePlugin 是命令式 API，浮层挂到 body，自动跟随明暗主题。 */
const showError = (text: string) => MessagePlugin.error(text);

const service = axios.create({
  baseURL: __BASE_URL__ + 'api',
  timeout: 10000,
  adapter: createMockAdapter(),
});

service.interceptors.request.use((config) => {
  const { token } = useUserStore.getState();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  ({ data: res = {} }) => {
    const { code, data, message } = res;
    if (code !== 0 && code !== 200) {
      void showError(i18n.t(message) || message || i18n.t('Request Error'));
      if (code == null || [1003, 1004, 1005].includes(code)) {
        useUserStore.getState().logout();
      }
      return Promise.reject(res);
    }
    return data ?? res;
  },
  (err = {}) => {
    const { message } = err;
    void showError(i18n.t(message) || message || i18n.t('Request Error'));
    return Promise.reject(err);
  },
);

export default function request<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return service(url, config).then((response) => response as unknown as T);
}
