/* eslint-disable no-alert */
import React from 'react';
import { ChannelsSidebar } from '@components/Sidebar/ChannelsSidebar';
import { ContextMenu } from '@components/Overlays/ContextMenu';
import { useStoreState } from '@state';
import { ThreadPanel } from '@components/Sidebar/ThreadPanel';
import { ChannelTopicModal } from '@components/Overlays/Modal/InformationModal/ChannelTopicModal';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import * as Styles from '@components/Core/styles';
import { svgUrls } from '@svg-assets';
import { useContextMenu } from '@hooks/useContextMenu';

const MessageRendererRoot = styled('div', {
  '--fonts-main': 'GgSans',
  height: '100%',
  width: '100%'
});

export default function GuildChannel() {
  const { disableBrowserMenu, hideContextMenu } = useContextMenu();

  const showContextMenu = useStoreState(state => state.ui.showContextMenu);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  return (
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
          <Styles.Main onContextMenu={disableBrowserMenu}>
            {showContextMenu && <ContextMenu />}
            <Styles.InnerMain onClick={hideContextMenu}>
              <ChannelTopicModal />
              <ChannelsSidebar />

              <TextChannelContainer />
            </Styles.InnerMain>
            <ThreadPanel />
          </Styles.Main>
        </MessageRendererRoot>
      )}
    </MessageRendererProvider>
  );
}
