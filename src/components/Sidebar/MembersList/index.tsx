import { useStoreState } from '@state';
import { MembersSidebarWrapper } from '../styles';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  console.log(isMembersListOpen);
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
