import { IconButtonWrapperProps } from '@icons/Buttons/IconButtonWrapper/button.types';
import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';

type IconButtonInnerProps = Partial<IconButtonWrapperProps>;

const IconButtonInner = ({
  backgroundGlowSize,
  iconContent,
  isActive,
  onClick,
  children
}: IconButtonInnerProps) => (
  <Styles.IconButtonChildrenWrapper
    onClick={onClick}
    backgroundGlowSize={backgroundGlowSize}
    isActive={isActive}
  >
    {children}
    {iconContent && (
      <Styles.IconButtonContentWrapper>{iconContent}</Styles.IconButtonContentWrapper>
    )}
  </Styles.IconButtonChildrenWrapper>
);

IconButtonInner.displayName = 'IconButtonInner';
IconButtonInner.whyDidYouRender = true;

export default IconButtonInner;
