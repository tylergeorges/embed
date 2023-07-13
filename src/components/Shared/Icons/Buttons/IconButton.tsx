import { IconButtonWrapper, IconButtonWrapperProps } from '@icons/Buttons/IconButtonWrapper';
import { IconProps, Icons } from '@icons/index';

type IconButtonProps = Omit<IconButtonWrapperProps, 'children'> &
  IconProps & {
    onClick: (e: React.SyntheticEvent) => void;
  };

export const IconButton = ({
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
);
