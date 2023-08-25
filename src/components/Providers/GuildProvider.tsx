import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useStoreActions, useStoreState } from '@state';
import { Loading } from '@components/Overlays/Loading';
import { useAppRouter } from '@hooks/useAppRouter';
import { useQuery } from '@apollo/client';

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

        rateLimitPerUser
      }
    }
  }
`);

export default function GuildProvider({ children }: GuildProviderProps) {
  const { guildId, router, isRouteLoaded } = useAppRouter();

  const { data, loading } = useQuery(guildDocument, {
    variables: { id: guildId }
  });

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setChannels = useStoreActions(state => state.guild.setChannels);
  const channels = useStoreState(state => state.guild.channels);

  useEffect(() => {
    if (!guildId && isRouteLoaded) {
      // Redirects to WidgetBot #general
      router.push('/channels/299881420891881473/368427726358446110');
    }

    if (data && !loading) {
      setGuildData(data.guild);
      // @ts-expect-error
      setSettings(data.guild.settings);
      // @ts-expect-error
      setChannels(data.guild.channels);
    }
  }, [data, loading, setChannels, setGuildData, setSettings, guildId, router, isRouteLoaded]);

  if (loading || !data || channels === undefined) return <Loading />;

  return <>{children}</>;
}
