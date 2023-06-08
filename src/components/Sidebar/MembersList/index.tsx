import { useStoreState } from '@state';
import { MembersSidebarWrapper } from '../elements';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MembersSidebarWrapper
      className="members-sidebar_wrapper non-dragable"
      membersListOpen={isMembersListOpen}
    >
      <div>ONLINE</div>
    </MembersSidebarWrapper>
  );
};
