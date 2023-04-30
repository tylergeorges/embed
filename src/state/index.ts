import { RootStore } from '@state/store';
import { createTypedHooks } from 'easy-peasy';

const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<RootStore>();

export { useStoreActions, useStoreState, useStoreDispatch, useStore };
