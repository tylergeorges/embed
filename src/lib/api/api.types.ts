import { AuthUser, GuestUser, GuildUser } from 'types/user.types';

type APISuccessResponse = {
  token: string;
  type: 'AUTH_SUCCESS';
};

export type APIDiscordSuccess = APISuccessResponse;

export type APIGuestSuccess = APISuccessResponse & {
  user: GuestUser;
};

export type APIGuildSuccess = APISuccessResponse & {
  user: GuildUser;
};

export type APIGuestResponse =
  | APIGuestSuccess
  | {
      type: 'AUTH_ERROR';
      message: string;
    };

export type APIGuildResponse =
  | APIGuildSuccess
  | {
      type: 'AUTH_ERROR';
      message: string;
    };

export type APIDiscordResponse =
  | APIDiscordSuccess
  | {
      type: 'AUTH_FAIL';
      error: string;
    };

export type AuthResponse<T extends AuthUser> = T extends GuestUser
  ? APIGuestResponse
  : T extends GuildUser
  ? APIGuildResponse
  : APIDiscordResponse;

export type AuthSuccessResponse<T extends AuthUser> = T extends GuestUser
  ? APIGuestSuccess
  : T extends GuildUser
  ? APIGuildSuccess
  : APIDiscordSuccess;

export type HandleAuthMessageResponse<T extends AuthUser> =
  | {
      type: 'ERROR';
      message: string;
    }
  | {
      type: 'SUCCESS';
      data: AuthSuccessResponse<T>;
    };
