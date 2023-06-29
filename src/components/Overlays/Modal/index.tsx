import {
  ModalBackdrop,
  ModalContainer,
  ModalContainerWrapper
} from '@components/Overlays/Modal/styles';
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
    {!disableBackdrop && <ModalBackdrop isOpen={isOpen} onClick={hideModal} css={{ zIndex: 12 }} />}
    <ModalContainerWrapper isOpen={isOpen} role="dialog" aria-label={title}>
      <ModalContainer isOpen={isOpen}>{children}</ModalContainer>
    </ModalContainerWrapper>
  </>
);
