type Provider = 'Discord' | 'Guild' | 'Guest';

interface BaseUser {
  provider: Provider;
  username: string;
  avatarUrl: string;
  id: string;
}

export interface DiscordUser extends BaseUser {
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
  id: string;
}

export type AuthUser = DiscordUser | GuildUser | GuestUser;
