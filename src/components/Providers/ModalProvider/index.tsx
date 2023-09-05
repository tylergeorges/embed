import { Fragment, ReactNode, createContext, useMemo, useReducer } from 'react';
import { Main } from '@components/Core/styles';
import { useContextMenu } from '@hooks/useContextMenu';
import {
  modalReducer,
  registeredModals,
  initialState,
  ModalData,
  ModalElement
} from '@components/Providers/ModalProvider/modalReducer';

const modalIds: string[] = [];

export const registerModal = (
  modalId: string,
  modalElement: ModalElement,
  openByDefault?: boolean
) => {
  if (!modalIds.includes(modalId)) {
    registeredModals[modalId] = { Comp: modalElement, isOpen: openByDefault ?? false, id: modalId };

    if (openByDefault) {
      initialState.modals.push({ Comp: modalElement, id: modalId, isOpen: true });
    }

    modalIds.push(modalId);
  }
};

export const ModalContextState = createContext<{
  modals: ModalData[];
  show: (modalId: string) => void;
  hide: (modalId: string) => void;
  removeFromDOM: (modalId: string) => void;
}>({ hide: () => {}, modals: initialState.modals, show: () => {}, removeFromDOM: () => {} });

interface ModalProviderWrapperProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderWrapperProps) {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const { disableBrowserMenu } = useContextMenu();

  const modalStateContext = useMemo(
    () => ({
      modals: modalState.modals,

      show: (modalId: string) => {
        dispatch({ id: modalId, type: 'show' });
      },

      hide: (modalId: string) => {
        dispatch({ id: modalId, type: 'hide' });
      },

      removeFromDOM: (modalId: string) => {
        dispatch({ id: modalId, type: 'removeFromDOM' });
      }
    }),
    [modalState]
  );

  return (
    <ModalContextState.Provider value={modalStateContext}>
      <Main onContextMenu={disableBrowserMenu}>
        {modalState.modals.map(Modal => (
          <Fragment key={Modal.id}>
            <Modal.Comp />
          </Fragment>
        ))}

        {children}
      </Main>
    </ModalContextState.Provider>
  );
}
