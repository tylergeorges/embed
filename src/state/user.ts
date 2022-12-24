import { Action, action } from 'easy-peasy';

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
  updateUserData: Action<UserStore, Partial<IUser>>;
}

const user: UserStore = {
  data: undefined,
  setUserData: action((state, payload) => {
    state.data = payload;
  }),

  updateUserData: action((state, payload) => {
    // @ts-expect-error limitation of Typescript, can't do much about that currently unfortunately.
    state.data = { ...state.data, ...payload };
  })
};

export default user;
