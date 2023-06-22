import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { MembersIcon } from '@components/Shared/Icons/MembersIcon';
import { useStoreActions, useStoreState } from '@state';

export const MembersButton = () => {
  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  return (
    <IconButtonWrapper
      tooltipPlacement="bottom"
      tooltipLabel={isMembersListOpen ? 'Hide Member List' : 'Show Member List'}
      onClick={() => setMembersListOpen(!isMembersListOpen)}
    >
      <MembersIcon isActive={isMembersListOpen} />
    </IconButtonWrapper>
  );
};
