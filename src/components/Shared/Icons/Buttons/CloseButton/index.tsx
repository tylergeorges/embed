import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { IconButtonWrapperProps } from '@icons/Buttons/IconButtonWrapper/button.types';

import React from 'react';

interface CloseButtonProps {
  onClick: () => void;

  buttonType?: IconButtonWrapperProps['buttonType'];
}

export const CloseButton = ({ onClick, buttonType }: CloseButtonProps) => (
  <IconButton
    icon="Close"
    tooltipDisabled
    onClick={onClick}
    size="sm"
    color="light"
    buttonType={buttonType}
  />
);
