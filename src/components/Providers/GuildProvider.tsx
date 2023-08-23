import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { Guild } from '@graphql/graphql';
import { GqlChannel } from 'types/guild.types';

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
        __typename

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
  const { guildId, router, isRouteLoaded } = useAppRouter();

  const [{ data, fetching }, fetchHook] = useQuery({
    query: guildDocument,
    variables: { id: guildId },
    requestPolicy: 'network-only'
  });

  const shouldRefetchGuild = useStoreState(state => state.guild.refetchGuild);
  const guildData = useStoreState(state => state.guild.data);
  const guildSettings = useStoreState(state => state.guild.settings);

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setRefetchGuild = useStoreActions(state => state.guild.setRefetchGuild);
  const setChannels = useStoreActions(state => state.guild.setChannels);

  useEffect(() => {
    if (!guildId && isRouteLoaded) {
      // router.push('/channels/585454996800405509/585840022511550494');
      router.push('/channels/299881420891881473/1143579521371615243');
    }
    // If auth state changed, refetch channels
    else if (shouldRefetchGuild) {
      const newToken = localStorage.getItem('token') ?? '';
      fetchHook({
        requestPolicy: 'network-only',
        fetchOptions: { headers: { Authorization: newToken } }
      });
    }
    // Set guild data
    else if (data && !fetching) {
      // Weird type error when casting
      // @ts-expect-error
      const guild = data.guild as Guild;

      // So guild data/settings only get set once
      if (!guildData && !guildSettings) {
        setGuildData(guild);

        setSettings(guild.settings);
      }

      setChannels(guild.channels as GqlChannel[]);

      setRefetchGuild(false);
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
    guildSettings,
    isRouteLoaded
  ]);

  return <></>;
}
