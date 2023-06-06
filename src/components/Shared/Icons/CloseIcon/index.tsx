import { CloseIconRoot } from '@components/Shared/Icons/Buttons/IconButtonWrapper/elements';
import { IconProps } from '../icon.types';

export const CloseIcon = ({ onClick, isActive, size, color }: IconProps) => (
  <CloseIconRoot
    size={size ?? 'regular'}
    isActive={isActive}
    aria-label="Close"
    className="icon-close"
    onClick={onClick}
    color={color || 'light'}
  >
    <path
      fill="currentColor"
      d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
    />
  </CloseIconRoot>
);
