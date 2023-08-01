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
  userToken?: string;
}

export async function apiRequest<T>({
  endPoint,
  method,
  userToken,
  options = {}
}: ApiReqArgs): Promise<T> {
  const token = userToken ?? localStorage.get('token') ?? '';

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

export const fetchDiscordUser = ({ userToken }: { userToken?: string }) =>
  apiRequest<IUser>({
    endPoint: Endpoints.auth.fetchLatestProfile,
    method: 'GET',
    userToken
  });
