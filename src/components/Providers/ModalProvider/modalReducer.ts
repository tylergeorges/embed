export interface ModalData {
  id: string;
  Comp: ModalElement;
  isOpen: boolean;
}

type ModalActionTypes = 'show' | 'hide' | 'removeFromDOM';

type ModalAction = { type: ModalActionTypes; id: string };

type ModalState = { modals: ModalData[] };

export type ModalElement = React.ComponentType<{}>;
export const registeredModals: Record<string, ModalData> = {};

export function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'hide': {
      const modal = state.modals.find(m => m.id === action.id);

      if (modal) {
        const index = state.modals.indexOf(modal);

        state.modals[index].isOpen = false;
      }

      return {
        ...state
      };
    }

    case 'removeFromDOM': {
      return {
        modals: state.modals.filter(m => m.id !== action.id)
      };
    }

    case 'show': {
      return {
        modals: [...state.modals, { ...registeredModals[action.id], isOpen: true }]
      };
    }

    default:
      return state;
  }
}

export const initialState: ModalState = {
  modals: []
};
