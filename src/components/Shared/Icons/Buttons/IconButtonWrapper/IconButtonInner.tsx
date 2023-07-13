import { IconButtonWrapperProps } from '@icons/Buttons/IconButtonWrapper/button.types';
import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';

type IconButtonInnerProps = Partial<IconButtonWrapperProps>;

const IconContent = ({ content }: { content: string }) => (
  <Styles.IconButtonContentWrapper>{content}</Styles.IconButtonContentWrapper>
);

export const IconButtonInner = ({
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
    {iconContent && <IconContent content={iconContent} />}
  </Styles.IconButtonChildrenWrapper>
);
