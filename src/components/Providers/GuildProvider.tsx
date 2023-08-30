import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { useApolloClient, useQuery } from '@apollo/client';
import { getToken } from '@graphql/client';
import { Guild } from '@graphql/graphql';

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
      invite
      owner

      __typename

      settings {
        __typename
        readonly
        guestMode
        defaultModeration
        directEnabled
        discordMode
        filesEnabled
        isCaptchaEnabled
        isCustomAuthEnabled
        showVoiceChannels
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
        nsfw

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
  const { guildId, router, isRouteLoaded, channelId } = useAppRouter();

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
            const guild = fetchMoreResult.guild as Guild;

            const token = getToken();

            if (!token) {
              const isAuthChannel = guild.channels.findIndex(ch => ch.id === channelId) === -1;

              // Redirect to non-auth channel if user signs out and was in an authed channel.
              if (isAuthChannel) {
                router.push(`/channels/${guildId}/${guild.channels[0].id}`);
              }
            }

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
    channelId,
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
