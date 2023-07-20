import { DomModals, VisibleModals } from './provider.types';

export interface State {
  domModals: DomModals;
  visibleModals: VisibleModals;
}

export type ModalReducerAction =
  | { type: 'show'; payload: { modalId: string; props?: React.ComponentProps<any> } }
  | { type: 'addToDOM'; payload: { modalId: string; props?: React.ComponentProps<any> } }
  | { type: 'hide'; payload: { modalId: string } }
  | { type: 'removeFromDOM'; payload: { modalId: string } };
