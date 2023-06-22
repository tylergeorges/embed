import {
  PopoverTitle,
  PopoverTitleWrapper,
  PopoverHeader,
  PopoverHeaderContent,
  PopoverContainer
} from '@components/Overlays/Modal/elements';
import { IconProps } from '@components/Shared/Icons/icon.types';
import { Close } from '@components/Sidebar/elements';
import { useMediaQuery } from '@lib/hooks';
import { ReactElement } from 'react';

interface PopoverProps {
  children: ReactElement<any, any>;
  isOpen: boolean;
  hideModal: () => void;
  title: string;
  TitleIcon?: ({ isActive }: IconProps) => JSX.Element;
  popoverFor: HTMLDivElement | null;
}

export const Popover = ({ children, isOpen, hideModal, title, TitleIcon, popoverFor }: PopoverProps) => {
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
                {TitleIcon && <TitleIcon />}

                <PopoverTitle className="popover-title">{title}</PopoverTitle>
              </PopoverTitleWrapper>
              <Close onClick={hideModal} />
            </PopoverHeaderContent>
          </PopoverHeader>

          {children}
        </PopoverContainer>
      </>
    );
  }
  return null;
};
