type Provider = 'Discord' | 'Guild' | 'Guest';

interface BaseUser {
  provider: Provider;
  username: string;
  avatarUrl: string;
}

export interface DiscordUser extends Omit<BaseUser, 'id'> {
  _id: string;
  discriminator: string;
  provider: 'Discord';
  blockedUsers: DiscordUser[];
}

export interface GuestUser extends BaseUser {
  provider: 'Guest';
  id: string;
}

export interface GuildUser extends BaseUser {
  provider: 'Guild';
  id: string;
}

export type AuthUser = DiscordUser | GuildUser | GuestUser;
