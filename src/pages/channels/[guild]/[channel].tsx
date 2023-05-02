import type { NextPage } from 'next';
import { Main } from '@components/Core';
import { MembersList } from '@components/SideBar/MembersList';
import { ChannelsList } from '@components/SideBar/ChannelsList';
import dynamic from 'next/dynamic';

// Dynamic import because it depends on using 'window' so we disable ssr
const Container = dynamic(
  () => import('../../../components/Core/Container/index').then(mod => mod.Container),
  {
    ssr: false
  }
);

const GuildChannel: NextPage = () => (
    <Main>
      <div className="inner_main">
        <ChannelsList />
        <Container />
        <MembersList />
      </div>
    </Main>
  );

export default GuildChannel;
