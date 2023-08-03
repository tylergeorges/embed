import { GuestUser, GuildUser } from 'types/user.types';

export type APIGuestResponse =
  | {
      token: string;
      type: 'AUTH_SUCCESS';
      user: GuestUser;
    }
  | {
      type: 'AUTH_ERROR';
      message: string;
    };

export type APIGuildResponse =
  | {
      token: string;
      type: 'AUTH_SUCCESS';
      user: GuildUser;
    }
  | {
      type: 'AUTH_ERROR';
      message: string;
    };
