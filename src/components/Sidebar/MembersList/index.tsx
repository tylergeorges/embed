import { useStoreState } from '@state';
import { MembersSidebarWrapper } from '../elements';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MembersSidebarWrapper
      css={{
        right: 0,
        // height: 'calc(100% - 60px)',
        // height: '100%',
        // position: 'absolute',
        // bottom: 0,
        transition: 'transform ease 0.3s',
        zIndex: 1
      }}
      className="members-sidebar_wrapper"
      membersListOpen={isMembersListOpen}
    >
      <div />
    </MembersSidebarWrapper>
  );
};
