import {
  PopoutTitle,
  PopoutTitleWrapper,
  PopoutHeader,
  PopoutHeaderContent,
  PopoutContainer
} from '@components/Overlays/Modal/elements';
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
        <PopoutContainer
          isMobile={windowIsMobile}
          isOpen={isOpen}
          aria-label={title}
          role="dialog"
          className="popout-container"
          css={{
            right: `calc(${popoutFor?.clientLeft}px + 80px)`
          }}
        >
          <PopoutHeader className="popout-header">
            <PopoutHeaderContent className="popout-header_content non-dragable">
              <PopoutTitleWrapper className="popout-title_container">
                {TitleIcon && <Icons name={TitleIcon} />}

                <PopoutTitle className="popout-title">{title}</PopoutTitle>
              </PopoutTitleWrapper>
              <IconButton onClick={hideModal} name="Close" backgroundGlowOnHover tooltipDisabled />
            </PopoutHeaderContent>
          </PopoutHeader>

          {children}
        </PopoutContainer>
      </>
    );
  }
  return null;
};
