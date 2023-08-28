import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { useApolloClient, useQuery } from '@apollo/client';

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
    __typename

    guild(id: $id) {
      id
      name
      icon
      memberCount
      rulesChannelId
      banner
      splash
      partnered
      verified
      tier
      __typename

      settings {
        __typename
        readonly
        guestMode
      }

      roles {
        __typename

        id
        name
        position
        color
        icon
        unicodeEmoji
      }

      emojis {
        id
        name
        animated
        available
      }

      channels {
        id
        name
        type
        position
        canSend
        __typename

        ... on ThreadChannel {
          __typename

          id
          type
          name
          parentId
        }

        category {
          id
          name
          position
        }

        ... on TextChannel {
          __typename

          topic

          threads {
            ... on ThreadChannel {
              __typename

              id
              type
              name
              parentId
            }
          }
        }
        ... on AnnouncementChannel {
          __typename
          id
          topic

          threads {
            __typename
            id
            ... on ThreadChannel {
              __typename

              id
              type
              name
              parentId
            }
          }
        }

        rateLimitPerUser
      }
    }
  }
`);

export default function GuildProvider({ setIsGuildFetched }: GuildProviderProps) {
  const { guildId, router, isRouteLoaded } = useAppRouter();

  const { data, loading, fetchMore } = useQuery(guildDocument, {
    variables: { id: guildId }
  });

  const shouldRefetchGuild = useStoreState(state => state.guild.refetchGuild);
  const guildData = useStoreState(state => state.guild.data);
  const guildSettings = useStoreState(state => state.guild.settings);
  const client = useApolloClient();

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setRefetchGuild = useStoreActions(state => state.guild.setRefetchGuild);
  const setChannels = useStoreActions(state => state.guild.setChannels);

  useEffect(() => {
    if (!guildId && isRouteLoaded) {
      router.push('/channels/299881420891881473/1143579521371615243');
    }
    // If auth state changed, refetch channels
    else if (shouldRefetchGuild) {
      client.resetStore();

      client.onResetStore(() =>
        fetchMore({
          query: guildDocument,
          variables: { id: guildId },
          updateQuery: (prev, { fetchMoreResult }) => {
            // Weird type error when casting
            // @ts-expect-error
            const guild = fetchMoreResult.guild as Guild;

            setChannels(guild.channels);
            setRefetchGuild(false);

            return fetchMoreResult;
          }
        })
      );
    }
    // Set guild data/settings once
    else if (data && !loading && !guildSettings) {
      // Weird type error when casting
      // @ts-expect-error
      const guild = data.guild as Guild;

      // So guild data/settings only get set once
      setGuildData(guild);
      setSettings(guild.settings);
      setChannels(guild.channels);

      setIsGuildFetched();
    }
  }, [
    data,
    loading,
    client,
    setChannels,
    setGuildData,
    setSettings,
    guildId,
    router,
    setIsGuildFetched,
    fetchMore,
    shouldRefetchGuild,
    setRefetchGuild,
    guildData,
    guildSettings,
    isRouteLoaded
  ]);

  return <></>;
}
