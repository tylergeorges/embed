type Provider = 'Discord' | 'Guild' | 'Guest';

interface BaseUser {
  provider: Provider;
  username: string;
  id: string;
  avatarUrl: string;
}

export interface DiscordUser extends Omit<BaseUser, 'id'> {
  _id: string;
  discriminator: string;
  provider: 'Discord';
  blockedUsers: string[];
}

export interface GuestUser extends BaseUser {
  provider: 'Guest';
}

export interface GuildUser extends BaseUser {
  provider: 'Guild';
}

export type AuthUser = DiscordUser | GuildUser | GuestUser;
