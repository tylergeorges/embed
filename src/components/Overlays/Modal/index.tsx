import * as Styles from '@components/Overlays/Modal/styles';
import { ReactElement } from 'react';

interface ModalProps {
  children: ReactElement<any, any>[];
  isOpen: boolean;
  title: string;
  disableBackdrop?: boolean;
  hideModal: () => void;
}

export const Modal = ({ children, isOpen, title, disableBackdrop, hideModal }: ModalProps) => (
  <>
    {!disableBackdrop && <Styles.ModalBackdrop isOpen={isOpen} onClick={hideModal} />}
    <Styles.ModalContainerWrapper isOpen={isOpen} role="dialog" aria-label={title}>
      <Styles.ModalContainer isOpen={isOpen}>{children}</Styles.ModalContainer>
    </Styles.ModalContainerWrapper>
  </>
);
