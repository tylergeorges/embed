import { useStoreState } from '@state';
import * as Styles from '../styles';

export const MembersSidebar = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  return (
    <Styles.MembersSidebarWrapper membersListOpen={isMembersListOpen} type="membersList">
      <div />
    </Styles.MembersSidebarWrapper>
  );
};
