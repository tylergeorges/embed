import { API_URL, Endpoints } from '@lib/api/url';
import { AuthUser } from 'types/user.types';
import {
  APIGuestResponse,
  APIGuildResponse,
  GuestLoginArgs,
  GuildLoginArgs,
  LatestProfileArgs
} from './api.types';

interface APIRequestOptions {
  headers?: { [key: string]: any };
  payload?: { [key: string]: any };
  baseURL?: string;

  authDisabled?: boolean;
}

interface ApiReqArgs {
  endpoint: string;
  method: 'GET' | 'POST';
  options?: APIRequestOptions;
  userToken?: string;
  baseURL?: String;
}

export async function apiRequest<T>({
  endpoint,
  method,
  userToken,
  options = {}
}: ApiReqArgs): Promise<T> {
  const token = userToken ?? '';

  const headers =
    {
      ...options.headers,
      Authorization: token,
      'Content-Type': 'application/json'
    } ?? {};

  return fetch(`${API_URL}${endpoint}`, {
    headers,
    method,
    mode: 'cors',
    body: JSON.stringify(options.payload)
  })
    .then(res => res.json())
    .then((data: T) => data)
    .catch(err => err);
}

export const fetchLatestProfile = ({ userToken }: LatestProfileArgs) =>
  apiRequest<AuthUser>({
    endpoint: Endpoints.auth.fetchLatestProfile,
    method: 'GET',
    userToken
  });

export const guestLogin = ({ username }: GuestLoginArgs) =>
  apiRequest<APIGuestResponse>({
    endpoint: Endpoints.auth.guest,
    method: 'POST',
    options: { payload: { username } }
  });

export const guildLogin = ({ guild, token }: GuildLoginArgs) =>
  apiRequest<APIGuildResponse>({
    endpoint: Endpoints.auth.guild,
    method: 'POST',
    options: {
      payload: {
        guild,
        token
      }
    }
  });
