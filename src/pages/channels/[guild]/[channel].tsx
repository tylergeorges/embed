import type { NextPage } from 'next';
import { Main } from '@components/Core';
import { ChannelsList } from '@components/Sidebar/ChannelsList';
import dynamic from 'next/dynamic';
import { InformationModal } from '@components/Overlays/Loading/Modal/InformationModal';
import { ContextMenu } from '@components/Overlays/ContextMenu';
import { useContextMenu } from '@lib/hooks';
import { useStoreState } from '@state';

const Container = dynamic(
  () => import('../../../components/Core/Container/index').then(mod => mod.Container),
  {
    ssr: false
  }
);

const GuildChannel: NextPage = () => {
  const { disableBrowserMenu } = useContextMenu();
  const showContextMenu = useStoreState(state => state.ui.showContextMenu);

  return (
    <Main onContextMenu={disableBrowserMenu}>
      {showContextMenu && <ContextMenu />}
      <InformationModal />
      <div className="inner_main">
        <ChannelsList />
        <Container />
        {/* <MembersList /> */}
      </div>
    </Main>
  );
};

export default GuildChannel;
