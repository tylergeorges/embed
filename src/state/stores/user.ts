import { Action, action } from 'easy-peasy';
import { AuthUser } from 'types/user.types';

// TODO: prolly a better place for this? as User is likely a commonly used interface

export interface UserStore {
  data?: AuthUser;
  setUserData: Action<UserStore, AuthUser | undefined>;
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
