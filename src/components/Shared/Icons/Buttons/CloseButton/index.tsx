import IconButton from '@components/Shared/Icons/Buttons/IconButton';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <IconButton icon="Close" tooltipDisabled onClick={onClick} />
);
