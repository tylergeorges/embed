import { CloseIcon } from '@components/Shared/Icons/CloseIcon';
import { IconProps } from '@components/Shared/Icons/icon.types';

interface CloseButtonProps extends IconProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick, color }: CloseButtonProps) => (
  <CloseIcon onClick={onClick} color={color} />
);
