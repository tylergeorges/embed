import { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useStoreActions, useStoreState } from '@state';
import { Loading } from '@components/Overlays/Loading';
import { useAppRouter } from '@hooks/useAppRouter';
import { useQuery } from '@apollo/client';
import { useContextMenu } from '@hooks/useContextMenu';
import dynamic from 'next/dynamic';
import { ChannelsSidebar } from '@components/Sidebar/ChannelsSidebar';
import { Channel, GuildSettings } from '@graphql/graphql';
import * as Styles from '../Core/styles';

interface GuildProviderProps {
  children: React.ReactNode;
}

const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
    guild(id: $id) {
      id
      name
      icon
      memberCount

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
            name
          }
        }
        ... on AnnouncementChannel {
          topic

          threads {
            id
            name
          }
        }

        rateLimitPerUser
      }
    }
  }
`);

const ContextMenu = dynamic(() =>
  import('@components/Overlays/ContextMenu').then(mod => mod.ContextMenu)
);

export default function GuildProvider({ children }: GuildProviderProps) {
  const { guildId, router, isRouteLoaded } = useAppRouter();

  const { data, loading } = useQuery(guildDocument, {
    variables: { id: guildId }
  });

  const { disableBrowserMenu } = useContextMenu();
  const showContextMenu = useStoreState(state => state.ui.showContextMenu);

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
      setSettings(data.guild.settings as GuildSettings);
      setChannels(data.guild.channels as Channel[]);
    }
  }, [data, loading, setChannels, setGuildData, setSettings, guildId, router, isRouteLoaded]);

  if (loading || !data || channels === undefined) return <Loading />;

  return (
    <Styles.Main onContextMenu={disableBrowserMenu}>
      <Styles.InnerMain>
        <ChannelsSidebar />

        {showContextMenu && <ContextMenu />}

        {children}
      </Styles.InnerMain>
    </Styles.Main>
  );
}
