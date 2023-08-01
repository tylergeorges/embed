import { IconButtonWrapper } from '@icons/Buttons/IconButtonWrapper';
import { IconButtonWrapperProps } from '@icons/Buttons/IconButtonWrapper/button.types';
import { IconProps, Icons } from '@icons/index';

type IconButtonProps = Omit<IconButtonWrapperProps, 'children'> &
  IconProps & {
    onClick: (e: React.SyntheticEvent) => void;
  };

export const IconButton = ({ icon, size, color, css, ...props }: IconButtonProps) => (
  <IconButtonWrapper {...props}>
    <Icons size={size} color={color} icon={icon} css={css} />
  </IconButtonWrapper>
);
