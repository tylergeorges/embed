export interface IUser {
  _id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
  provider: 'Guild' | 'Discord' | 'Guest';
  blockedUsers: IUser[];
}
