import { getEnvVar } from '@util/env';

const serverEndpoint = getEnvVar('CUSTOM_SERVER_ENDPOINT');
const isDev = serverEndpoint?.includes('127.0.0.1');

export const socketScheme = isDev ? 'ws://' : ('wss://' as const);
export const httpScheme = isDev ? 'http://' : ('https://' as const);

export const WS_URL = `${socketScheme}${serverEndpoint}/api/graphql` as const;
export const API_URL = `${httpScheme}${serverEndpoint}` as const;
export const GRAPHQL_URL = `${API_URL}/api/graphql` as const;

export const Endpoints = {
  auth: {
    guest: '/api/auth/guest',
    fetchLatestProfile: '/api/auth/fetchLatestProfile',
    discord: '/api/auth/discord/login',
    guild: '/api/auth/guild/login'
  }
} as const;
