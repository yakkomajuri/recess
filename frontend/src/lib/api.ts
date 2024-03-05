import axios, { AxiosRequestConfig } from "axios";

interface ApiConfig extends AxiosRequestConfig {
  disableTokenAuth?: boolean;
}

export function getCookie(name: string): string | null {
  let cookieValue: string | null = null;
  if (document.cookie && document.cookie !== "") {
    for (let cookie of document.cookie.split(";")) {
      cookie = cookie.trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const BASE_URL = "http://localhost:8000";

export const api = {
  get: (path: string, config: ApiConfig = {}) =>
    axios({
      method: "get",
      url: `${BASE_URL}${path}`,
      headers: {
        ...(config.disableTokenAuth
          ? {}
          : { Authorization: `Token ${getCookie("csrftoken")}` }),
        ...config.headers,
      },
      ...config,
    }),
  post: (
    path: string,
    data: Record<string, any> = {},
    config: ApiConfig = {}
  ) =>
    axios({
      data,
      method: "post",
      url: `${BASE_URL}${path}`,
      headers: {
        ...(config.disableTokenAuth
          ? {}
          : { Authorization: `Token ${getCookie("csrftoken")}` }),
        ...config.headers,
      },
      ...config,
    }),
  put: (path: string, data: Record<string, any> = {}, config: ApiConfig = {}) =>
    axios({
      data,
      method: "put",
      url: `${BASE_URL}${path}`,
      headers: {
        ...(config.disableTokenAuth
          ? {}
          : { Authorization: `Token ${getCookie("csrftoken")}` }),
        ...config.headers,
      },
      ...config,
    }),
};
