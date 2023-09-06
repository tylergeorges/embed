import * as Styles from '@components/Overlays/Modal/styles';
import { IconProps, Icons } from '@components/Shared/Icons';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { ReactElement, memo } from 'react';
import { CloseButton } from '@icons/Buttons/CloseButton';

type TitleIcon = IconProps['icon'];

interface PopoutProps {
  children: ReactElement<any, any>;
  isOpen: boolean;
  hideModal: () => void;
  TitleIcon: TitleIcon;
  title: string;
  popoutFor: HTMLDivElement | null;
}

export const Popout = memo(
  ({ children, isOpen, hideModal, title, TitleIcon, popoutFor }: PopoutProps) => {
    const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

    if (!popoutFor || !isOpen) return <></>;

    return (
      <Styles.PopoutContainer
        isMobile={windowIsMobile}
        isOpen={isOpen}
        aria-label={title}
        role="dialog"
        css={{
          right: `calc(${popoutFor.clientLeft}px + 80px)`
        }}
      >
        <Styles.PopoutHeader>
          <Styles.PopoutTitleWrapper>
            {TitleIcon && <Icons icon={TitleIcon} />}

            <Styles.PopoutTitle>{title}</Styles.PopoutTitle>
          </Styles.PopoutTitleWrapper>

          <CloseButton onClick={hideModal} buttonType="headerIcon" />
        </Styles.PopoutHeader>

        {children}
      </Styles.PopoutContainer>
    );
  }
);

Popout.displayName = 'Popout';
