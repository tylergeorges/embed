import type { NextPage } from 'next';
import { Main } from '@components/Core';
import { ChannelsList } from '@components/Sidebar/ChannelsList';
import dynamic from 'next/dynamic';

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
      {/* <MembersList /> */}
    </div>
  </Main>
);

export default GuildChannel;
