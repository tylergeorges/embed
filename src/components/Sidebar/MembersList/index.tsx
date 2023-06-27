import { useStoreState } from '@state';
import { MembersSidebarWrapper } from '../elements';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MembersSidebarWrapper
      className="members-sidebar_wrapper non-dragable"
      membersListOpen={isMembersListOpen}
      type="members_list"
    >
      <div>ONLINE</div>
    </MembersSidebarWrapper>
  );
};
