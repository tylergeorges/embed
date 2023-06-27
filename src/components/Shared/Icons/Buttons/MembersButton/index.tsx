import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';

export const MembersButton = () => {
  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  return (
    <IconButton
      tooltipPlacement="bottom"
      tooltipLabel={isMembersListOpen ? 'Hide Member List' : 'Show Member List'}
      onClick={() => setMembersListOpen(!isMembersListOpen)}
      name="Members"
      isActive={isMembersListOpen}
    />
  );
};
