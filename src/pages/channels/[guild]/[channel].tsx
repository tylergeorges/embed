/* eslint-disable no-alert */
import React from 'react';
import { ChannelsSidebar } from '@components/Sidebar/ChannelsSidebar';
import { useStoreState } from '@state';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import * as Styles from '@components/Core/styles';
import { svgUrls } from '@svg-assets';
import dynamic from 'next/dynamic';
import ModalProvider from '@components/Providers/ModalProvider';
import { ThreadPanel } from '@components/Sidebar/ThreadPanel';
import { ChannelTopicModal } from '@components/Overlays/Modal/InformationModal/ChannelTopicModal';

const MessageRendererRoot = styled('div', {
  '--fonts-main': 'GgSans',
  height: '100%',
  width: '100%'
});

const ContextMenu = dynamic(() =>
  import('@components/Overlays/ContextMenu').then(mod => mod.ContextMenu)
);

ModalProvider.register('channel-topic-modal', ChannelTopicModal);
ModalProvider.register('sidebar-threads-panel', ThreadPanel);
ModalProvider.register('sidebar-channels-list', ChannelsSidebar, true);

export default function GuildChannel() {
  const showContextMenu = useStoreState(state => state.ui.showContextMenu);

  const guildChannels = useStoreState(state => state.guild.guildChannels);

  return (
    <>
      <MessageRendererProvider
        messageButtons={() => []}
        currentUser={() => null}
        // @ts-ignore
        resolveChannel={id => (guildChannels[id] as APIChannel) ?? null}
        resolveGuild={() => null}
        resolveMember={() => null}
        resolveRole={() => null}
        resolveUser={() => null}
        svgUrls={svgUrls}
        seeThreadOnClick={(messageId, thread) =>
          alert(`See Thread "${thread.name}" clicked on message ${messageId}`)
        }
        userMentionOnClick={user =>
          alert(`User "${user?.global_name ?? user?.username}" mention clicked!`)
        }
        roleMentionOnClick={role => alert(`Role "${role.name}" mention clicked!`)}
        channelMentionOnClick={channel => alert(`Channel "${channel.name}" mention clicked!`)}
        messageComponentButtonOnClick={(message, customId) => {
          alert(`Button by custom id "${customId}" pressed on message ${message.id}!`);
        }}
      >
        {({ themeClass }) => (
          <MessageRendererRoot className={themeClass}>
            {showContextMenu && <ContextMenu />}

            <Styles.InnerMain>
              <TextChannelContainer />
            </Styles.InnerMain>
          </MessageRendererRoot>
        )}
      </MessageRendererProvider>
    </>
  );
}
