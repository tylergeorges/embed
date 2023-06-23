import {
  PopoverTitle,
  PopoverTitleWrapper,
  PopoverHeader,
  PopoverHeaderContent,
  PopoverContainer
} from '@components/Overlays/Modal/elements';
import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { IconProps, Icons } from '@components/Shared/Icons/Icons';
import { useMediaQuery } from '@lib/hooks';
import { ReactElement } from 'react';

type TitleIcon = Pick<IconProps, 'name'>['name'];
interface PopoverProps {
  children: ReactElement<any, any>;
  isOpen: boolean;
  hideModal: () => void;
  TitleIcon: TitleIcon;
  title: string;
  popoverFor: HTMLDivElement | null;
}

export const Popover = ({
  children,
  isOpen,
  hideModal,
  title,
  TitleIcon,
  popoverFor
}: PopoverProps) => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  if (popoverFor && isOpen) {
    return (
      <>
        <PopoverContainer
          isMobile={windowIsMobile}
          isOpen={isOpen}
          aria-label={title}
          role="dialog"
          className="popover-container"
          css={{
            right: `calc(${popoverFor?.clientLeft}px + 80px)`
          }}
        >
          <PopoverHeader className="popover-header">
            <PopoverHeaderContent className="popover-header_content non-dragable">
              <PopoverTitleWrapper className="popover-title_container">
                {TitleIcon && <Icons name={TitleIcon} />}

                <PopoverTitle className="popover-title">{title}</PopoverTitle>
              </PopoverTitleWrapper>
              <IconButton onClick={hideModal} name="Close" backgroundGlowOnHover tooltipDisabled />
            </PopoverHeaderContent>
          </PopoverHeader>

          {children}
        </PopoverContainer>
      </>
    );
  }
  return null;
};
