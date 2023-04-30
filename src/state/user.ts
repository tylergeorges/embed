import { UserState } from '@state/types';
import { action } from 'easy-peasy';

const user: UserState.Store = {
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
