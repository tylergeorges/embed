import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { CloseIcon } from '@components/Shared/Icons/CloseIcon';
import { IconProps } from '@components/Shared/Icons/icon.types';

interface CloseButtonProps extends IconProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick, color }: CloseButtonProps) => (
  <IconButtonWrapper onClick={onClick}>
    <CloseIcon color={color} />
  </IconButtonWrapper>
);
