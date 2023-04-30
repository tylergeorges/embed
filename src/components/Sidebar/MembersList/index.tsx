import { MembersSideBar } from '@components/SideBar/elements';
import { useStoreState } from '@state';

export const MembersList = () => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MembersSideBar
      css={{
        right: 0,
        height: 'calc(100% - 60px)',
        bottom: 0
      }}
      membersListOpen={isMembersListOpen}
    >
      <div />
    </MembersSideBar>
  );
};
