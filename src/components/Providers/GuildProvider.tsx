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

const ContextMenu = dynamic(() =>
  import('@components/Overlays/ContextMenu').then(mod => mod.ContextMenu)
);

const ThreadPanel = dynamic(() =>
  import('@components/Sidebar/ThreadPanel').then(mod => mod.ThreadPanel)
);

export default function GuildProvider({ children }: GuildProviderProps) {
  const { guildId, router, isRouteLoaded, threadId, channelId } = useAppRouter();

  const { data, loading } = useQuery(guildDocument, {
    variables: { id: guildId }
  });

  const { disableBrowserMenu } = useContextMenu();
  const showContextMenu = useStoreState(state => state.ui.showContextMenu);

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setChannels = useStoreActions(state => state.guild.setChannels);
  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);
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

      const currentChannel = data.guild.channels.find(ch => ch.id === channelId);

      if (threadId && currentChannel?.threads) {
        setCurrentThread(currentChannel.threads.find(ch => ch.id === threadId) as Channel);

        // Adds element to DOM
        setIsDomThreadsPanelOpen(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, setChannels, setGuildData, setSettings, guildId, router, isRouteLoaded]);

  if (loading || !data || channels === undefined) return <Loading />;

  return (
    <Styles.Main onContextMenu={disableBrowserMenu}>
      <Styles.InnerMain>
        <ChannelsSidebar />

        {showContextMenu && <ContextMenu />}

        <ThreadPanel />
        {children}
      </Styles.InnerMain>
    </Styles.Main>
  );
}
