import { theme } from '@stitches';
import { Fragment, ReactNode, createContext, useReducer } from 'react';
import { Main } from '@components/Core/styles';
import { useContextMenu } from '@hooks/useContextMenu';
import {
  hideModal,
  showModal,
  removeModalFromDOM,
  modalReducer,
  domModals,
  initialState,
  addToDom,
  visibleModals,
  modalIds
} from './modalReducer';
import {
  ModalHide,
  ModalRegister,
  ModalShow,
  DomModals,
  VisibleModals
} from './types/provider.types';
import { ModalReducerAction } from './types/reducer.types';

// We reassign this with dispatch returned from useReducer so functions can dispatch
let dispatch: React.Dispatch<ModalReducerAction> = () => {
  throw Error('Dispatch not set.');
};

interface ModalContextConfig {
  domModals: DomModals;
  visibleModals: VisibleModals;
}

let showTimeout: NodeJS.Timeout | null = null;
let hideTimeout: NodeJS.Timeout | null = null;

export const show: ModalShow = (modalId, props?: React.ComponentProps<any>) => {
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  dispatch(addToDom(modalId, props));

  // Timeout to so that components entry animations/transitions are shown
  showTimeout = setTimeout(() => {
    dispatch(showModal(modalId, props));
  }, 1);
};

export const hide: ModalHide = (modalId, hideWithDelay) => {
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  // Transition element off screen
  dispatch(hideModal(modalId));

  const modalDuration = Number(theme.transitions.longerDuration.value.split('ms')[0]);

  // remove from DOM
  if (hideWithDelay) {
    const backdropDuration = modalDuration * 2;

    // Wait for element's exit transition to finish then remove from DOM
    hideTimeout = setTimeout(() => {
      dispatch(removeModalFromDOM(modalId));
    }, backdropDuration);
  } else {
    hideTimeout = setTimeout(() => {
      dispatch(removeModalFromDOM(modalId));
    }, modalDuration);
  }
};

// Register modal
export const register: ModalRegister = (modalId, modalElement, openByDefault) => {
  if (!modalIds.includes(modalId)) {
    domModals[modalId] = { Comp: modalElement, isOpen: openByDefault ?? false };

    visibleModals[modalId] = { Comp: modalElement, isOpen: openByDefault ?? false };

    modalIds.push(modalId);
  }
};

const ModalContextState = createContext<ModalContextConfig>(initialState);

interface ModalProviderWrapperProps {
  children: ReactNode;
}

function ModalProvider({ children }: ModalProviderWrapperProps) {
  const [modalState, reducerDispatch] = useReducer(modalReducer, initialState);
  const { disableBrowserMenu } = useContextMenu();

  // re-assign global dispatch function
  dispatch = reducerDispatch;

  return (
    <ModalContextState.Provider value={modalState}>
      <Main onContextMenu={disableBrowserMenu}>
        {children}

        {modalIds
          .filter(id => modalState.domModals[id].isOpen)
          .map(id => {
            const DomModal = modalState.domModals[id];

            if (DomModal && DomModal.isOpen) {
              const TransitionedModal = modalState.visibleModals[id];

              const hideModal = () => {
                hide(id);
              };

              return (
                <Fragment key={id}>
                  <DomModal.Comp
                    {...DomModal?.props}
                    hideModal={hideModal}
                    isOpen={TransitionedModal?.isOpen ?? false}
                  />
                </Fragment>
              );
            }

            return <></>;
          })}
      </Main>
    </ModalContextState.Provider>
  );
}

const modalProviderConfig = {
  register,
  show,
  hide,
  Provider: ModalProvider,
  state: initialState,
  reducer: modalReducer,
  context: ModalContextState
};

export default modalProviderConfig;
