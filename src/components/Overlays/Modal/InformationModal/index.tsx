import { Modal } from '@components/Overlays/Modal';
import { ModalHeader, ModalHeaderContent } from '@components/Overlays/Modal/elements';
import { Close } from '@components/Sidebar/elements';
import { ReactElement } from 'react';

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
    <ModalHeader>
      <ModalHeaderContent className="non-dragable">
        {title} <Close onClick={hideModal} />
      </ModalHeaderContent>
    </ModalHeader>

    {children}
  </Modal>
);
