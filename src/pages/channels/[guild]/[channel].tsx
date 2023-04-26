import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { useMemo } from 'react';
import { graphql } from '@/graphql';
import { Main } from '@/components/Core';
import { TextChannelView } from '@/components/Core/TextChannel/TextChannelView';
import { ChannelsListView } from '@/components/Core/ChannelsList/ChannelsListView';

const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
    guild(id: $id) {
      name
      channels {
        id
        name
        type
        position
        category {
          id
          name
          position
        }
        rateLimitPerUser
      }
    }
  }
`);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const channelDocument = graphql(/* GraphQL */ `
  query Channel($channelId: String!, $guildId: String!) {
    channelV2(id: $channelId, guild: $guildId) {
      id
    }
  }
`);

const GuildChannel: NextPage = () => {
  const router = useRouter();
  const { guild: guildID, channel: channelID } = router.query;
  const [{ data }] = useQuery({ query: guildDocument, variables: { id: guildID as string } });

  const currentChannel = useMemo(
    () => data?.guild.channels.find(c => c.id === channelID),
    [channelID, data]
  );

  const categories = useMemo(
    () =>
      [...new Map(data?.guild.channels.map(c => [c.category?.id, c.category])).values()].filter(
        c => c
      ),

    [data]
  );

  if (!data) return <div>loading...</div>;

  const { guild } = data;

  console.log(guild);
  return (
    <Main>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%'
        }}
      >
        {/* //! Channels Side Bar */}
        <ChannelsListView categories={categories} guildData={data} guildID={guildID as string} />

        <TextChannelView channel={currentChannel!.name} guildName={guild.name} />
      </div>
    </Main>
  );
};

export default GuildChannel;
