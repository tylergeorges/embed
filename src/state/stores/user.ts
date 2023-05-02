import { Action, action } from 'easy-peasy';

// TODO: prolly a better place for this? as User is likely a commonly used interface
export interface IUser {
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
  provider: 'Guild' | 'Discord' | 'Guest';
}

export interface UserStore {
  data?: IUser;
  setUserData: Action<UserStore, IUser>;
}

const user: UserStore = {
  data: undefined,
  setUserData: action((state, payload) => {
    state.data = payload;
  })
};

export default user;
