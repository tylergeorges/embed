type Provider = 'Discord' | 'Guild' | 'Guest';

interface BaseUser {
  provider: Provider;
  username: string;
  id: string;
  avatarUrl: string;
}

export interface IUser extends Omit<BaseUser, 'id'> {
  _id: string;
  discriminator: string;
  provider: 'Discord';
  blockedUsers: IUser[];
}

export interface GuestUser extends BaseUser {
  provider: 'Guest';
}

export interface GuildUser extends BaseUser {
  provider: 'Guild';
}
