import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';

import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <IconButton icon="Close" tooltipDisabled onClick={onClick} size="sm" color="lighter" />
);
