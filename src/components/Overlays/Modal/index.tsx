import * as Styles from '@components/Overlays/Modal/styles';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  disableBackdrop?: boolean;
  hideModal: () => void;
}

export const Modal = ({ children, isOpen, title, disableBackdrop, hideModal }: ModalProps) => (
  <>
    {!disableBackdrop && <Styles.Backdrop type="modal" isOpen={isOpen} onClick={hideModal} />}

    <Styles.ModalContainerWrapper isOpen={isOpen} role="dialog" aria-label={title}>
      <Styles.ModalContainer isOpen={isOpen} tabIndex={-1}>
        {children}
      </Styles.ModalContainer>
    </Styles.ModalContainerWrapper>
  </>
);
