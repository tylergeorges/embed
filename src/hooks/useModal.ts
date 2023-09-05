import { ModalContextState } from '@components/Providers/ModalProvider';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

interface UseModalProps {
  modalId: string;
  openByDefault?: boolean;
}

export function useModal({ modalId, openByDefault = false }: UseModalProps) {
  const [transitionedModalIsOpen, setTransitionedModalIsOpen] = useState(openByDefault);
  const { hide, removeFromDOM } = useContext(ModalContextState);

  // We want to wait for this element to be transitioned off the page before removing
  // modal from DOM
  const waitForElementRef = useRef<HTMLDivElement>(null);
  const isModalMounted = useRef(false);

  useEffect(() => {
    setTransitionedModalIsOpen(true);
  }, []);

  const removeAfterTransitionEnd = useCallback(() => {
    // This sets to true once transitioned modal is done
    if (!isModalMounted.current) {
      isModalMounted.current = true;
    } else if (!transitionedModalIsOpen) {
      // Once the element transitions off screen remove it from DOM
      removeFromDOM(modalId);
    }
  }, [modalId, transitionedModalIsOpen, removeFromDOM]);

  if (waitForElementRef.current) {
    waitForElementRef.current.ontransitionend = removeAfterTransitionEnd;
  }

  // Triggers removeAfterTransitionEnd to run
  const closeTransitionedModal = useCallback(() => {
    setTransitionedModalIsOpen(false);
    hide(modalId);
  }, [modalId, hide]);

  return {
    waitForElementRef,
    isOpen: transitionedModalIsOpen,
    closeModal: closeTransitionedModal,
    removeAfterTransitionEnd
  };
}
