import { graphql } from '@graphql/index';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { useEffect } from 'react';
import { Main } from '@components/Core';
import { TextChannel } from '@components/Core/TextChannel';
import { ChannelsList } from '@components/SideBar/ChannelsList';
import { MembersList } from '@components/SideBar/MembersList';
import { useStoreActions } from '@hooks/storeHooks';
import { RouterQuery } from 'types/routerQuery';

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
  const { guild: guildID, channel: channelID } = router.query as RouterQuery;

  // Fetch guild data
  const [{ data, fetching }] = useQuery({
    query: guildDocument,
    variables: { id: guildID as string }
  });

  // Action to set the guild data in store
  const setGuildData = useStoreActions(state => state.ui.setGuildData);

  useEffect(() => {
    if (!fetching && data) {
      // Add guild data to store
      setGuildData({ ...data, guildID, channelID });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGuildData, fetching]);

  if (data && !fetching) {
    return (
      <Main>
        <div className="inner_main">
          <ChannelsList />
          <TextChannel />
          <MembersList />
        </div>
      </Main>
    );
  }
  return <div>loading...</div>;
};

export default GuildChannel;
