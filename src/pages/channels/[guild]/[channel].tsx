import type { NextPage } from 'next';
import { Main } from '@components/Core';
import { MembersList } from '@components/Sidebar/MembersList';
import { ChannelsList } from '@components/Sidebar/ChannelsList';
import { Container } from '@components/Core/Container';

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
