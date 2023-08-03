import { useEffect, useRef } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';

interface GuildProviderProps {
  setIsGuildFetched: () => void;
}

const guildDocument = graphql(/* GraphQL */ `
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

  const [{ data, fetching }] = useQuery({
    query: guildDocument,
    variables: { id: guildId }
  });

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setChannels = useStoreActions(state => state.guild.setChannels);
  const channels = useStoreState(state => state.guild.channels);
  const localFetchedRef = useRef(false);

  useEffect(() => {
    if (!guildId) {
      //

      router.push(`/channels/585454996800405509/1117820894795010138`);
      // router.push(`/channels/585454996800405509/1117820894795010138?token=${userToken}`);
      // router.push(`/channels/585454996800405509/1117820894795010138?username=guest`);
    }
    if (data && !fetching && !localFetchedRef.current) {
      console.log('GUILD DATA FETCHED ');
      setGuildData(data.guild);
      // @ts-expect-error
      setSettings(data.guild.settings);
      // @ts-expect-error
      setChannels(data.guild.channels);

      console.log('guild provider set data', data, fetching);
      setIsGuildFetched();
      localFetchedRef.current = true;
    }
  }, [
    data,
    fetching,
    setChannels,
    setGuildData,
    setSettings,
    guildId,
    router,
    channels,
    setIsGuildFetched
  ]);

  return <></>;
}
