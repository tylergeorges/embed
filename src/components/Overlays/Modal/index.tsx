import * as Styles from '@components/Overlays/Modal/styles';

type ModalHeaderContainerProps = React.ComponentProps<typeof Styles.ModalContainer>;

type ModalProps = ModalHeaderContainerProps & {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  disableBackdrop?: boolean;
  hideModal: () => void;
};

export const Modal = ({
  children,
  isOpen,
  title,
  disableBackdrop,
  hideModal,
  containerSize
}: ModalProps) => (
  <>
    {!disableBackdrop && <Styles.Backdrop type="modal" isOpen={isOpen} onClick={hideModal} />}

    <Styles.ModalContainerWrapper isOpen={isOpen} role="dialog" aria-label={title}>
      <Styles.ModalContainer isOpen={isOpen} tabIndex={-1} containerSize={containerSize ?? 'sm'}>
        {children}
      </Styles.ModalContainer>
    </Styles.ModalContainerWrapper>
  </>
);
