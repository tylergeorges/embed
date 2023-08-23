import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { Guild } from '@graphql/graphql';

interface GuildProviderProps {
  setIsGuildFetched: () => void;
}

export const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
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

      settings {
        readonly
        guestMode
      }

      roles {
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

        ... on ThreadChannel {
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
          topic

          threads {
            ... on ThreadChannel {
              id
              type
              name
              parentId
            }
          }
        }
        ... on AnnouncementChannel {
          topic

          threads {
            ... on ThreadChannel {
              id
              type
              name
              parentId
            }
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
    variables: { id: guildId }
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
      router.push(`/channels/299881420891881473/368427726358446110`);
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
      const guild = data.guild as Guild;

      // So guild data/settings only get set once
      if (!guildData && !guildSettings) {
        setGuildData(guild);

        setSettings(guild.settings);
      }

      setChannels(guild.channels);

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
