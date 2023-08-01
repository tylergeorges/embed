import { API_URL, Endpoints } from '@lib/api/url';
import axios from 'axios';
import { IUser } from 'types/user.types';

interface APIRequestOptions {
  headers?: { [key: string]: any };
  payload?: { [key: string]: any };
  baseURL?: string;

  authDisabled?: boolean;
}

const axiosClient = axios.create({
  baseURL: API_URL
});

interface ApiReqArgs {
  endPoint: string;
  method: 'GET' | 'POST';
  options?: APIRequestOptions;
}

export async function apiRequest<T>({ endPoint, method, options = {} }: ApiReqArgs): Promise<T> {
  const token = window.localStorage.getItem('token') ?? '';

  console.log(token);
  const headers = { ...options.headers, Authorization: token } ?? {};

  return axiosClient
    .request({
      method,
      url: endPoint,
      headers
    })
    .then(res => res.data)
    .catch(err => err);
}

export const fetchDiscordUser = async () =>
  apiRequest<IUser>({
    endPoint: Endpoints.auth.fetchLatestProfile,
    method: 'GET'
  });
