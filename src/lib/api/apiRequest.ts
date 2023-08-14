import { API_URL, Endpoints } from '@lib/api/url';
import axios from 'axios';
import { DiscordUser } from 'types/user.types';
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

const axiosClient = axios.create({
  baseURL: API_URL
});

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

  const headers = { ...options.headers, Authorization: token } ?? {};

  return axiosClient
    .request({
      method,
      url: endpoint,
      headers,
      data: options.payload ?? {}
    })
    .then(res => res.data)
    .catch(err => err);
}

export const fetchLatestProfile = ({ userToken }: LatestProfileArgs) =>
  apiRequest<DiscordUser>({
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
