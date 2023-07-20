import * as Styles from '@components/Overlays/Modal/styles';
import { IconProps, Icons } from '@components/Shared/Icons';
import { ReactElement, useEffect, useRef } from 'react';
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

export const Popout = ({
  children,
  isOpen,
  hideModal,
  title,
  TitleIcon,
  popoutFor
}: PopoutProps) => {
  const popoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const popout = popoutRef.current;

    if (popout && popoutFor) {
      const right = popoutFor.clientLeft + 80;
      popout.style.right = `${right}px`;
    }
  }, [popoutFor]);

  return (
    <Styles.PopoutContainer
      isMobile={{
        '@initial': false,
        '@small': true
      }}
      isOpen={isOpen}
      aria-label={title}
      role="dialog"
      ref={popoutRef}
    >
      <Styles.PopoutHeader>
        <Styles.PopoutHeaderContent>
          <Styles.PopoutTitleWrapper>
            {TitleIcon && <Icons icon={TitleIcon} />}

            <Styles.PopoutTitle>{title}</Styles.PopoutTitle>
          </Styles.PopoutTitleWrapper>

          <CloseButton onClick={hideModal} />
        </Styles.PopoutHeaderContent>
      </Styles.PopoutHeader>

      {children}
    </Styles.PopoutContainer>
  );
};
