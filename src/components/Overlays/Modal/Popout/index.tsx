import * as Styles from '@components/Overlays/Modal/styles';
import { IconProps, Icons } from '@components/Shared/Icons';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { ReactElement, memo, useEffect, useRef } from 'react';
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

const Popout = memo(({ children, isOpen, hideModal, title, TitleIcon, popoutFor }: PopoutProps) => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const popoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popoutFor && popoutRef.current) {
      const right = popoutFor.clientLeft + 80;

      popoutRef.current.style.right = `${right}px`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!popoutFor || !isOpen) return <></>;

  return (
    <Styles.PopoutContainer
      isMobile={windowIsMobile}
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
});

Popout.whyDidYouRender = true;
Popout.displayName = 'Popout';

export default Popout;
