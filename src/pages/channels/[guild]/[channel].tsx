import type { NextPage } from 'next';
import { Main } from '@components/Core';
import { TextChannel } from '@components/Core/TextChannel';
import { ChannelsList } from '@components/Sidebar/ChannelsList';
import { MembersList } from '@components/Sidebar/MembersList';

const GuildChannel: NextPage = () => {
  return (
    <Main>
      <div className="inner_main">
        <ChannelsList />
        <TextChannel />
        <MembersList />
      </div>
    </Main>
  );
};

export default GuildChannel;
