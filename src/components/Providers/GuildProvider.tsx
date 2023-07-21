import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions, useStoreState } from '@state';
import { Loading } from '@components/Overlays/Loading';
import { useRouter } from 'next/router';

interface GuildProviderProps {
  children: React.ReactNode;
}

const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
    guild(id: $id) {
      id
      name
      settings {
        readonly
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

export default function GuildProvider({ children }: GuildProviderProps) {
  const router = useRouter();
  const { guild: guildId, channel: channelId } = router.query;

  const [{ data, fetching }] = useQuery({
    query: guildDocument,
    variables: { id: guildId as string }
  });

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setChannels = useStoreActions(state => state.guild.setChannels);
  const setCurrentChannel = useStoreActions(state => state.guild.setCurrentChannel);
  const channels = useStoreState(state => state.guild.channels);

  useEffect(() => {
    if (!guildId) {
      router.push('/channels/299881420891881473/355719584830980096');
    }

    if (data && !fetching) {
      setGuildData(data.guild);
      // @ts-expect-error
      setSettings(data.guild.settings);
      // @ts-expect-error
      setChannels(data.guild.channels);

      setCurrentChannel(channelId as string);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fetching, setChannels, setGuildData, setSettings, guildId, router, channelId]);

  if (fetching || !data || channels === undefined) return <Loading />;

  return <>{children}</>;
}
