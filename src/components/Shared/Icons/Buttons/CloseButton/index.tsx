import { CloseIcon } from '@components/Shared/Icons/CloseIcon';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => <CloseIcon onClick={onClick} />;
