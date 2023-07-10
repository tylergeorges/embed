import {
  IconButtonWrapper,
  IconButtonWrapperProps
} from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { IconProps, Icons } from '@components/Shared/Icons/Icons';

interface IconButtonProps extends IconProps, Omit<IconButtonWrapperProps, 'children'> {
  onClick: (arg0: any) => void;
}

export const IconButton = ({
  onClick,
  name,
  color,
  css,
  backgroundGlowOnHover,
  isActive,
  backgroundGlowSize,
  size,
  tooltipDisabled,
  tooltipLabel,
  tooltipPlacement,
  customSize,
  iconContent,
  tooltipDisabledIfActive
}: IconButtonProps) => (
  <IconButtonWrapper
    tooltipLabel={tooltipLabel}
    tooltipPlacement={tooltipPlacement}
    tooltipDisabledIfActive={tooltipDisabledIfActive}
    tooltipDisabled={tooltipDisabled}
    backgroundGlowOnHover={backgroundGlowOnHover}
    backgroundGlowSize={backgroundGlowSize}
    onClick={onClick}
    isActive={isActive}
    iconContent={iconContent}
  >
    <Icons size={size} color={color} name={name} css={css} customSize={customSize} />
  </IconButtonWrapper>
);
