import { useStoreState } from '@state';
import { MembersSidebarWrapper } from '../elements';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MembersSidebarWrapper
      css={{
        right: 0, // Test this

        transition: 'transform ease 0.3s',
        zIndex: 1,
        justifySelf: 'flex-end'
        // backgroundColor:'green'
        // alignSelf:"flex-end",
      }}
      className="members-sidebar_wrapper"
      membersListOpen={isMembersListOpen}
    >
      <div>ONLINE</div>
    </MembersSidebarWrapper>
  );
};
