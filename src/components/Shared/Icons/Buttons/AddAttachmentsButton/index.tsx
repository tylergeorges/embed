import { AddAttachmentsIcon } from '@components/Shared/Icons/AddAttachmentsIcon';
import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';

interface AddAttachmentsButtonProps {
  onClick: (e: React.SyntheticEvent) => void;
}
export const AddAttachmentsButton = ({ onClick }: AddAttachmentsButtonProps) => (
  // const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  // const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  <IconButtonWrapper tooltipDisabled onClick={onClick}>
    <AddAttachmentsIcon />
  </IconButtonWrapper>
);
