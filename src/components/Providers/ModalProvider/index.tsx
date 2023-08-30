/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Fragment,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import { Main } from '@components/Core/styles';
import { useContextMenu } from '@hooks/useContextMenu';

import { ModalRegister, ModalElement } from './types/provider.types';

let showTimeout: NodeJS.Timeout | null = null;

interface Modals {
  id: string;
  Comp: ModalElement;
  isOpen: boolean;
}

const registeredModals: Record<string, Modals> = {};
// const visibleModals: VisibleModals = {};
const modalIds: string[] = [];

type ModalActionTypes = 'show' | 'hide' | 'removeFromDOM';

type ModalAction = { type: ModalActionTypes; id: string };
type ModalState = { modals: Modals[] };

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'hide': {
      return {
        modals: state.modals.filter(m => m.id !== action.id)
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

const initialState: ModalState = {
  modals: []
};

// Register modal
export const register: ModalRegister = (modalId, modalElement, openByDefault) => {
  if (!modalIds.includes(modalId)) {
    registeredModals[modalId] = { Comp: modalElement, isOpen: openByDefault ?? false, id: modalId };

    if (openByDefault) {
      initialState.modals.push({ Comp: modalElement, id: modalId, isOpen: true });
    }
    // visibleModals[modalId] = { Comp: modalElement, isOpen: openByDefault ?? false };

    modalIds.push(modalId);
  }
};

export const ModalContextState = createContext<{
  modals: Modals[];
  show: (modalId: string) => void;
  hide: (modalId: string) => void;
}>({ hide: () => {}, modals: initialState.modals, show: () => {} });

interface ModalProviderWrapperProps {
  children: ReactNode;
}

function ModalProvider({ children }: ModalProviderWrapperProps) {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);
  // const { domModals, visibleModals } = useContext(ModalContextState);

  // const [myDomModals, setMyDomModals] = useState<Modals[]>([]);
  // const [myVisibleModals, setMyVisibleModals] = useState<Modals[]>([]);
  // const [myDomModals, setMyDomModals] = useState<DomModals>({});
  // const [myVisibleModals, setMyVisibleModals] = useState<DomModals>({});

  const { disableBrowserMenu } = useContextMenu();

  const removeFromDOM = (modalId: string) => {
    console.log(registeredModals, modalId);

    dispatch({ id: modalId, type: 'hide' });
    // setMyDomModals(prev => prev.filter(modal => modal.id !== modalId));
  };

  // const hide = (modalId: string) => {
  //   console.log(registeredModals, modalId);

  //   // setMyVisibleModals(prev => [...prev, { Comp: modalToShow.Comp, id, isOpen: false }]);
  //   dispatch({ id: modalId, type: 'hide' });

  //   // setMyVisibleModals(prev => prev.filter(modal => modal.id !== modalId));
  //   // setMyVisibleModals(prev => prev);

  //   // domModals[modalId].isOpen = false;
  //   // visibleModals[modalId].isOpen = false;
  // };

  // const show = (modalId: string) => {
  //   console.log(registeredModals, modalId);
  //   dispatch({ id: modalId, type: 'show' });

  //   // const modalToShow = registeredModals[modalId].Comp;

  //   // if (!myDomModals.find(m => m.id === modalId))
  //   //   setMyDomModals(prev => [...prev, { id: modalId, Comp: modalToShow }]);
  //   // setMyVisibleModals(prev => ({
  //   //   ...prev,
  //   //   [modalId]: {
  //   //     ...prev[modalId],
  //   //     isOpen: true
  //   //   }
  //   // }));
  //   // setMyDomModals(prev => ({
  //   //   ...prev,
  //   //   [modalId]: {
  //   //     ...prev[modalId],
  //   //     isOpen: true
  //   //   }
  //   // }));
  //   // domModals[modalId].isOpen = true;
  //   // visibleModals[modalId].isOpen = true;
  // };

  const value = {
    modals: modalState.modals,

    show: (modalId: string) => {
      console.log(registeredModals, modalId);
      dispatch({ id: modalId, type: 'show' });
    },

    hide: (modalId: string) => {
      console.log(registeredModals, modalId);

      dispatch({ id: modalId, type: 'hide' });
    }
  };

  return (
    <ModalContextState.Provider value={value}>
      <Main onContextMenu={disableBrowserMenu}>
        {children}

        {modalState.modals.map(Modal => {
          return (
            <Fragment key={Modal.id}>
              <Modal.Comp
                // {...DomModal?.props}
                // hideModal={hideModal}
                isOpen
                // isOpen={TransitionedModal?.isOpen ?? false}
              />
            </Fragment>
          );
          // }

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
  const { hide } = useContext(ModalContextState);

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
      // removeFromDOM(modalId);

      // dispatch(removeModalFromDOM(modalId));
    }
  }, [modalId, transitionedModalIsOpen]);

  if (waitForElementRef.current) {
    waitForElementRef.current.ontransitionend = removeAfterTransitionEnd;
  }

  // Triggers removeAfterTransitionEnd to run
  const closeTransitionedModal = useCallback(() => {
    console.log('closeTransitionedModal');
    setTransitionedModalIsOpen(false);
    hide(modalId);

    // dispatch(hideModal(modalId));
  }, [modalId, hide]);

  return {
    waitForElementRef,
    isOpen: transitionedModalIsOpen,
    closeModal: closeTransitionedModal,
    removeAfterTransitionEnd
  };
}

const modalProviderConfig = {
  register,
  Provider: ModalProvider,
  state: initialState,
  context: ModalContextState
};

export default modalProviderConfig;
