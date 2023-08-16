import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';

interface GuildProviderProps {
  setIsGuildFetched: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textChannelFragment = graphql(`
  fragment TextChannel on TextChannel {
    id
    name
    type
    position
    canSend
    topic

    category {
      id
      name
      position
    }

    threads {
      id
      name
    }
  }
`);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const annoucmentChannelFragment = graphql(`
  fragment AnnouncementChannel on AnnouncementChannel {
    id
    name
    type
    position
    canSend
    topic

    category {
      id
      name
      position
    }

    threads {
      id
      name
    }
  }
`);

export const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
    guild(id: $id) {
      id
      name
      settings {
        readonly
        guestMode
      }

      channels {
        id
        name
        type
        position
        canSend
        __typename

        threads {
          id
          name
        }
        category {
          id
          name
          position
        }

        ... on TextChannel {
          topic

          threads {
            id
          }
        }
        ... on AnnouncementChannel {
          topic

          threads {
            id
          }
        }
        ... on ForumChannel {
          topic
        }

        rateLimitPerUser
      }
    }
  }
`);

export default function GuildProvider({ setIsGuildFetched }: GuildProviderProps) {
  const { guildId, router } = useAppRouter();

  const [{ data, fetching }, fetchHook] = useQuery({
    query: guildDocument,
    variables: { id: guildId },
    requestPolicy: 'cache-and-network'
  });

  const shouldRefetchGuild = useStoreState(state => state.guild.refetchGuild);
  const guildData = useStoreState(state => state.guild.data);
  const guildSettings = useStoreState(state => state.guild.settings);

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setRefetchGuild = useStoreActions(state => state.guild.setRefetchGuild);
  const setChannels = useStoreActions(state => state.guild.setChannels);

  useEffect(() => {
    const newToken = localStorage.getItem('token') ?? '';

    if (!guildId) {
      //

      router.push(`/channels/299881420891881473/355719584830980096`);
    }
    // If auth state changed, refetch channels
    else if (shouldRefetchGuild) {
      fetchHook({
        requestPolicy: 'network-only',
        fetchOptions: { headers: { Authorization: newToken } }
      });
      setRefetchGuild(false);
    }
    // Set guild data
    else if (data && !fetching) {
      // So guild data/settings only get set once
      if (!guildData && !guildSettings) {
        setGuildData(data.guild);

        // @ts-expect-error
        setSettings(data.guild.settings);
      }
      // @ts-expect-error
      setChannels(data.guild.channels);

      setIsGuildFetched();
    }
  }, [
    data,
    fetching,
    setChannels,
    setGuildData,
    setSettings,
    guildId,
    router,
    setIsGuildFetched,
    fetchHook,
    shouldRefetchGuild,
    setRefetchGuild,
    guildData,
    guildSettings
  ]);

  return <></>;
}
