import { useStoreState } from '@state';
import { MembersSidebarWrapper } from '../elements';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MembersSidebarWrapper
      css={{
        right: 0,
        height: 'calc(100% - 60px)',
        bottom: 0
      }}
      className="members-sidebar_wrapper"
      membersListOpen={isMembersListOpen}
    >
      <div />
    </MembersSidebarWrapper>
  );
};
