import * as Styles from '@components/Overlays/Modal/styles';
import { Modal } from '@components/Overlays/Modal';

import { ReactElement } from 'react';
import { CloseButton } from '@icons/Buttons/CloseButton';

interface InformationModalProps {
  children: ReactElement<any, any>;

  title: string;

  disableBackdrop?: boolean;

  /** Used to hide modal */
  modalId: string;
}

export const InformationModal = ({
  children,
  title,
  disableBackdrop,
  modalId
}: InformationModalProps) => (
  <Modal title={title} disableBackdrop={disableBackdrop} modalId={modalId}>
    {({ closeModal }) => (
      <>
        <Styles.ModalHeader>
          <Styles.ModalHeaderContent>
            #{title}
            <CloseButton onClick={closeModal} />
          </Styles.ModalHeaderContent>
        </Styles.ModalHeader>

        {children}
      </>
    )}
  </Modal>
);
