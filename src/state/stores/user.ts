import { Action, action } from 'easy-peasy';
import { IUser, GuestUser, GuildUser } from 'types/user.types';

// TODO: prolly a better place for this? as User is likely a commonly used interface

export interface UserStore {
  data?: IUser | GuestUser | GuildUser;
  setUserData: Action<UserStore, IUser | GuestUser | GuildUser | undefined>;
}

const user: UserStore = {
  data: undefined,

  setUserData: action((state, payload) => {
    if (state.data !== payload) {
      state.data = payload;
    }
  })
};

export default user;
