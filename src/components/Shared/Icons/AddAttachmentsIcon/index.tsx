import { AddAttachmentsIconRoot } from '@components/Shared/Icons/Buttons/IconButtonWrapper/elements';
import { IconProps } from '@components/Shared/Icons/icon.types';

export const AddAttachmentsIcon = ({ isActive, css, size, color }: IconProps) => (
  <AddAttachmentsIconRoot
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    isActive={isActive}
    css={css}
    size={size ?? 'regular'}
    color={color || 'light'}
  >
    <path
      fill="currentColor"
      d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
    />
  </AddAttachmentsIconRoot>
);
