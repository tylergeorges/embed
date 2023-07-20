import { useStoreState } from '@state';
import { useIsModalOpen } from '@hooks/useIsModalOpen';
import * as Styles from '../styles';

export const MembersSidebar = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isThreadsPanelOpen = useIsModalOpen('sidebar-threads-panel');

  return (
    <Styles.MembersSidebarWrapper
      membersListOpen={!isThreadsPanelOpen && isMembersListOpen}
      type="membersList"
    >
      <div />
    </Styles.MembersSidebarWrapper>
  );
};
