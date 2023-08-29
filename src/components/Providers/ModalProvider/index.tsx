import {
  Fragment,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import { Main } from '@components/Core/styles';
import { useContextMenu } from '@hooks/useContextMenu';
import {
  showModal,
  hideModal,
  modalReducer,
  domModals,
  initialState,
  addToDom,
  visibleModals,
  modalIds,
  removeModalFromDOM
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

/** use useModal for animated exits. */
export const hide: ModalHide = modalId => {
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  // remove from DOM
  dispatch(hideModal(modalId));

  hideTimeout = setTimeout(() => {
    dispatch(removeModalFromDOM(modalId));
    console.log('hideTimeout removeModalFromDOM');
  }, 1000);
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
          .filter(id => modalState.domModals[id]?.isOpen)
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

interface UseModalProps {
  modalId: string;
  openByDefault?: boolean;
}

export function useModal({ modalId, openByDefault = false }: UseModalProps) {
  const [transitionedModalIsOpen, setTransitionedModalIsOpen] = useState(openByDefault);
  // const [transitionedModalIsOpen, setTransitionedModalIsOpen] = useState(openByDefault);

  // We want to wait for this element to be transitioned off the page before removing
  // modal from DOM
  const waitForElementRef = useRef<HTMLDivElement>(null);

  const isModalMounted = useRef(false);

  useEffect(() => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }

    setTransitionedModalIsOpen(true);

    return () => {
      if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
      }
    };
  }, []);

  const removeAfterTransitionEnd = useCallback(() => {
    console.log('removeAfterTransitionEnd', isModalMounted.current);
    // This sets to true once transitioned modal is done
    if (!isModalMounted.current) {
      isModalMounted.current = true;
    } else if (!transitionedModalIsOpen) {
      // Once the element transitions off screen remove it from DOM
      console.log('remove from dom');
      dispatch(removeModalFromDOM(modalId));
    }
  }, [modalId, transitionedModalIsOpen]);

  if (waitForElementRef.current) {
    waitForElementRef.current.ontransitionend = removeAfterTransitionEnd;
  }

  // Triggers removeAfterTransitionEnd to run
  const closeTransitionedModal = useCallback(() => {
    console.log('closeTransitionedModal');
    setTransitionedModalIsOpen(false);
    dispatch(hideModal(modalId));
  }, [modalId]);

  return {
    waitForElementRef,
    isOpen: transitionedModalIsOpen,
    closeModal: closeTransitionedModal,
    removeAfterTransitionEnd
  };
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
