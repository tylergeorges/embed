import type { NextPage } from 'next';
import { Main, InnerMain } from '@components/Core';
import { ChannelsList } from '@components/Sidebar/ChannelsList';
import dynamic from 'next/dynamic';
import { ContextMenu } from '@components/Overlays/ContextMenu';
import { useContextMenu } from '@lib/hooks';
import { useStoreState } from '@state';
import { ThreadPanel } from '@components/Sidebar/ThreadPanel';
import { ChannelTopicModal } from '@components/Overlays/Modal/InformationModal/ChannelTopicModal';

const Container = dynamic(
  () => import('../../../components/Core/Container/index').then(mod => mod.Container),
  {
    ssr: false
  }
);

const GuildChannel: NextPage = () => {
  const { disableBrowserMenu } = useContextMenu();
  const showContextMenu = useStoreState(state => state.ui.showContextMenu);
  const showTopicModal = useStoreState(state => state.ui.showTopicModal);
  return (
    <Main onContextMenu={disableBrowserMenu}>
      {showContextMenu && <ContextMenu />}

      {showTopicModal && <ChannelTopicModal />}
      <InnerMain>
        <ChannelsList />
        <Container />
        <ThreadPanel />
      </InnerMain>
    </Main>
  );
};

export default GuildChannel;
