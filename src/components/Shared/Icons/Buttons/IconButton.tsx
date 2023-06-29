import {
  IconButtonWrapper,
  IconButtonWrapperProps
} from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { IconProps, Icons } from '@components/Shared/Icons/Icons';

interface Props extends IconProps, Omit<IconButtonWrapperProps, 'children'> {
  onClick: (arg0: any) => void;
}

export const IconButton = ({
  onClick,
  alwaysShowTooltip,
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
  customSize
}: Props) => (
  <IconButtonWrapper
    tooltipLabel={tooltipLabel}
    backgroundGlowSize={backgroundGlowSize}
    tooltipPlacement={tooltipPlacement}
    onClick={onClick}
    alwaysShowTooltip={alwaysShowTooltip}
    tooltipDisabled={tooltipDisabled}
    backgroundGlowOnHover={backgroundGlowOnHover}
    isActive={isActive}
  >
    <Icons size={size} color={color} name={name} css={css} customSize={customSize} />
  </IconButtonWrapper>
);
