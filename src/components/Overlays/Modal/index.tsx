import * as Styles from '@components/Overlays/Modal/styles';
import { CloseButton } from '@icons/Buttons/CloseButton';

type ModalHeaderContentProps = React.ComponentProps<typeof Styles.ModalHeaderContent>;

type ModalHeaderContainerProps = React.ComponentProps<typeof Styles.ModalContainer>;

interface ModalProps extends ModalHeaderContentProps, ModalHeaderContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  disableBackdrop?: boolean;
  subheader?: string;
  hideModal: () => void;
}

export const Modal = ({
  children,
  isOpen,
  title,
  disableBackdrop,
  hideModal,
  titleAlignment,
  titleSize,
  containerSize,
  subheader
}: ModalProps) => (
  <>
    {!disableBackdrop && <Styles.Backdrop type="modal" isOpen={isOpen} onClick={hideModal} />}

    <Styles.ModalContainerWrapper isOpen={isOpen} role="dialog" aria-label={title}>
      <Styles.ModalContainer isOpen={isOpen} containerSize={containerSize}>
        <Styles.ModalCloseWrapper>
          <CloseButton onClick={hideModal} />
        </Styles.ModalCloseWrapper>
        <Styles.ModalHeader>
          <Styles.ModalHeaderContent
            titleSize={titleSize ?? 'lg'}
            titleAlignment={titleAlignment ?? 'left'}
          >
            {title}
          </Styles.ModalHeaderContent>
          {subheader && <Styles.ModalSubheaderContent>{subheader}</Styles.ModalSubheaderContent>}
        </Styles.ModalHeader>

        {children}
      </Styles.ModalContainer>
    </Styles.ModalContainerWrapper>
  </>
);
