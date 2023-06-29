import * as Styles from '@components/Overlays/Modal/styles';
import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { IconProps, Icons } from '@components/Shared/Icons/Icons';
import { useMediaQuery } from '@lib/hooks';
import { ReactElement } from 'react';

type TitleIcon = Pick<IconProps, 'name'>['name'];
interface PopoutProps {
  children: ReactElement<any, any>;
  isOpen: boolean;
  hideModal: () => void;
  TitleIcon: TitleIcon;
  title: string;
  popoutFor: HTMLDivElement | null;
}

export const Popout = ({
  children,
  isOpen,
  hideModal,
  title,
  TitleIcon,
  popoutFor
}: PopoutProps) => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  if (popoutFor && isOpen) {
    return (
      <>
        <Styles.PopoutContainer
          isMobile={windowIsMobile}
          isOpen={isOpen}
          aria-label={title}
          role="dialog"
          css={{
            right: `calc(${popoutFor?.clientLeft}px + 80px)`
          }}
        >
          <Styles.PopoutHeader>
            <Styles.PopoutHeaderContent>
              <Styles.PopoutTitleWrapper>
                {TitleIcon && <Icons name={TitleIcon} />}

                <Styles.PopoutTitle>{title}</Styles.PopoutTitle>
              </Styles.PopoutTitleWrapper>
              <IconButton onClick={hideModal} name="Close" backgroundGlowOnHover tooltipDisabled />
            </Styles.PopoutHeaderContent>
          </Styles.PopoutHeader>

          {children}
        </Styles.PopoutContainer>
      </>
    );
  }
  return null;
};
