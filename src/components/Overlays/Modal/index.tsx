import * as Styles from '@components/Overlays/Modal/styles';
import { useModal } from '@components/Providers/ModalProvider';

interface ModalProps {
  children: ({ closeModal }: { closeModal: () => void }) => React.ReactNode;

  title: string;

  disableBackdrop?: boolean;

  modalId: string;
}

export const Modal = ({ children, title, disableBackdrop, modalId }: ModalProps) => {
  const { waitForElementRef, closeModal, isOpen, removeAfterTransitionEnd } = useModal({
    modalId
  });

  return (
    <>
      {!disableBackdrop && (
        <Styles.Backdrop
          type="modal"
          isOpen={isOpen}
          onClick={closeModal}
          ref={waitForElementRef}
        />
      )}

      <Styles.ModalContainerWrapper
        isOpen={isOpen}
        role="dialog"
        aria-label={title}
        onTransitionEnd={disableBackdrop ? removeAfterTransitionEnd : undefined}
        ref={disableBackdrop ? waitForElementRef : undefined}
      >
        <Styles.ModalContainer isOpen={isOpen}>{children({ closeModal })}</Styles.ModalContainer>
      </Styles.ModalContainerWrapper>
    </>
  );
};
