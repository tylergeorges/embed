import { ModalReducerAction, State } from './types/reducer.types';
import { DomModals, VisibleModals } from './types/provider.types';

// Handles elements in DOM
export const domModals: DomModals = {};

// Handles elements visibility on screen
export const visibleModals: VisibleModals = {} as VisibleModals;

export const modalIds: string[] = [];

export const initialState: State = { domModals, visibleModals };

export function modalReducer(state: State, action: ModalReducerAction): State {
  switch (action.type) {
    case 'show': {
      const { modalId } = action.payload;

      const props =
        action.payload.props ??
        state.visibleModals[modalId]?.props ??
        state.domModals[modalId]?.props;

      return {
        ...state,

        visibleModals: {
          ...state.visibleModals,
          [modalId]: { ...state.visibleModals[modalId], isOpen: true, props }
        }
      };
    }

    case 'addToDOM': {
      const { modalId } = action.payload;

      const props = action.payload.props ?? state.domModals[modalId].props;
      return {
        ...state,

        domModals: {
          ...state.domModals,
          [modalId]: { ...state.domModals[modalId], isOpen: true, props }
        }
      };
    }

    case 'hide': {
      const { modalId } = action.payload;

      return {
        ...state,
        visibleModals: {
          ...state.visibleModals,
          [modalId]: { ...state.visibleModals[modalId], isOpen: false }
        }
      };
    }
    case 'removeFromDOM': {
      const { modalId } = action.payload;

      return {
        ...state,
        domModals: { ...state.domModals, [modalId]: { ...state.domModals[modalId], isOpen: false } }
      };
    }

    default: {
      throw Error('Unknown action: ', action);
    }
  }
}

export function showModal(modalId: string, props?: React.ComponentProps<any>) {
  return {
    type: 'show',
    payload: {
      modalId,
      props
    }
  } as const;
}

export function addToDom(modalId: string, props?: React.ComponentProps<any>) {
  return {
    type: 'addToDOM',
    payload: {
      modalId,
      props
    }
  } as const;
}

export function hideModal(modalId: string) {
  return {
    type: 'hide',
    payload: {
      modalId
    }
  } as const;
}

export function removeModalFromDOM(modalId: string) {
  return {
    type: 'removeFromDOM',
    payload: {
      modalId
    }
  } as const;
}
