import { Modal } from '@components/Overlays/Modal';
import * as Styles from '@components/Overlays/Modal/styles';
import { ReactElement } from 'react';
import { CloseButton } from '@icons/Buttons/CloseButton';

interface InformationModalProps {
  children: ReactElement<any, any>;
  isOpen: boolean;
  hideModal: () => void;
  title: string;
  disableBackdrop?: boolean;
}

export const InformationModal = ({
  children,
  isOpen,
  hideModal,
  title,
  disableBackdrop
}: InformationModalProps) => (
  <Modal isOpen={isOpen} title={title} hideModal={hideModal} disableBackdrop={disableBackdrop}>
    <Styles.ModalHeader>
      <Styles.ModalHeaderContent className="non-dragable">
        {title}

        <CloseButton onClick={hideModal} />
      </Styles.ModalHeaderContent>
    </Styles.ModalHeader>

    {children}
  </Modal>
);
