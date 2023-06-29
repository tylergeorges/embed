import { useStoreState } from '@state';
import * as Styles from '../styles';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <Styles.MembersSidebarWrapper
      className="members-sidebar_wrapper non-dragable"
      membersListOpen={isMembersListOpen}
      type="members_list"
    >
      <div>ONLINE</div>
    </Styles.MembersSidebarWrapper>
  );
};
