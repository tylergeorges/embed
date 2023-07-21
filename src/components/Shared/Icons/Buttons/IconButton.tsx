import IconButtonWrapper from '@icons/Buttons/IconButtonWrapper';
import { IconButtonWrapperProps } from '@icons/Buttons/IconButtonWrapper/button.types';
import { IconProps, Icons } from '@icons/index';
import { memo } from 'react';

type IconButtonProps = Omit<IconButtonWrapperProps, 'children'> &
  IconProps & {
    onClick?: (e: React.SyntheticEvent) => void;
  };

const IconButton = memo(
  ({
    onClick,
    icon,
    color,
    css,
    isActive,
    backgroundGlowSize,
    size,
    tooltipDisabled,
    tooltipLabel,
    tooltipPlacement,
    iconContent,
    tooltipDisabledIfActive
  }: IconButtonProps) => (
    <IconButtonWrapper
      tooltipLabel={tooltipLabel}
      tooltipPlacement={tooltipPlacement}
      tooltipDisabledIfActive={tooltipDisabledIfActive}
      tooltipDisabled={tooltipDisabled}
      backgroundGlowSize={backgroundGlowSize}
      onClick={onClick}
      isActive={isActive}
      iconContent={iconContent}
    >
      <Icons size={size} color={color} icon={icon} css={css} />
    </IconButtonWrapper>
  )
);

IconButton.displayName = 'IconButton';
IconButton.whyDidYouRender = true;
export default IconButton;
