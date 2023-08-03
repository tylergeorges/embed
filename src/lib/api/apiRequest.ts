import { API_URL, Endpoints } from '@lib/api/url';
import axios from 'axios';
import { DiscordUser } from 'types/user.types';
import { APIGuestResponse, APIGuildResponse } from './api.types';

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
  baseURL?: String;
}

export async function apiRequest<T>({
  endPoint,
  method,
  userToken,
  options = {}
}: ApiReqArgs): Promise<T> {
  const token = userToken ?? '';

  const headers = { ...options.headers, Authorization: token } ?? {};

  return axiosClient
    .request({
      method,
      url: endPoint,
      headers,
      data: options.payload ?? {}
    })
    .then(res => res.data)
    .catch(err => err);
}

export const fetchDiscordUser = ({ userToken }: { userToken?: string }) =>
  apiRequest<DiscordUser>({
    endPoint: Endpoints.auth.fetchLatestProfile,
    method: 'GET',
    userToken
  });

export const guestLogin = ({ username }: { username: string }) =>
  apiRequest<APIGuestResponse>({
    endPoint: Endpoints.auth.guest,
    method: 'POST',
    options: { payload: { username } }
  });

export const guildLogin = ({ guild, token }: { guild: string; token: string }) =>
  apiRequest<APIGuildResponse>({
    endPoint: Endpoints.auth.guild,
    method: 'POST',
    options: {
      payload: {
        guild,
        token
      }
    }
  });
