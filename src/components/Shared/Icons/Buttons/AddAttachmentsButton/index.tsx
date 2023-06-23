import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { Icons } from '@components/Shared/Icons/Icons';

interface AddAttachmentsButtonProps {
  onClick: (e: React.SyntheticEvent) => void;
}
export const AddAttachmentsButton = ({ onClick }: AddAttachmentsButtonProps) => (
  <IconButtonWrapper tooltipDisabled onClick={onClick} isActive={false}>
    <Icons name="AddAttachment" />
  </IconButtonWrapper>
);
