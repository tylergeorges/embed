import { Modal } from '@components/Overlays/Modal';
import * as Styles from '@components/Overlays/Modal/styles';
import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
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
    <Styles.ModalHeader>
      <Styles.ModalHeaderContent className="non-dragable">
        {title}{' '}
        <IconButton
          name="Close"
          tooltipDisabled
          backgroundGlowOnHover
          backgroundGlowSize={35}
          onClick={hideModal}
        />
      </Styles.ModalHeaderContent>
    </Styles.ModalHeader>

    {children}
  </Modal>
);
