import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { MembersIcon } from '@components/Shared/Icons/MembersIcon';
import { useStoreActions, useStoreState } from '@state';

export const MembersButton = () => {
  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  return (
    <IconButtonWrapper
      tooltipPlacement="bottom"
      button_label={isMembersListOpen ? 'Hide Member List' : 'Show Member List'}
    >
      <MembersIcon
        isActive={isMembersListOpen}
        onClick={() => setMembersListOpen(!isMembersListOpen)}
      />
    </IconButtonWrapper>
  );
};
