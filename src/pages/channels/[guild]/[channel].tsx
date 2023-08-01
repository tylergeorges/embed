/* eslint-disable no-alert */
import React, { memo } from 'react';
import { ChannelsSidebar } from '@components/Sidebar/ChannelsSidebar';
import { useStoreState } from '@state';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import * as Styles from '@components/Core/styles';
import { svgUrls } from '@svg-assets';
import { useContextMenu } from '@hooks/useContextMenu';
import dynamic from 'next/dynamic';

const MessageRendererRoot = styled('div', {
  '--fonts-main': 'GgSans',
  height: '100%',
  width: '100%'
});

// dynamic imports since they are conditionally rendered, helps with bundle size
const ChannelTopicModal = dynamic(() =>
  import('@components/Overlays/Modal/InformationModal/ChannelTopicModal').then(
    mod => mod.ChannelTopicModal
  )
);

const ThreadPanel = dynamic(() =>
  import('@components/Sidebar/ThreadPanel').then(mod => mod.ThreadPanel)
);

const ContextMenu = dynamic(() =>
  import('@components/Overlays/ContextMenu').then(mod => mod.ContextMenu)
);

function GuildChannel() {
  const { disableBrowserMenu } = useContextMenu();

  const isDomThreadsPanelOpen = useStoreState(state => state.ui.isDomThreadsPanelOpen);

  const showContextMenu = useStoreState(state => state.ui.showContextMenu);
  const showTopicModal = useStoreState(state => state.ui.showTopicModal);

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

            <Styles.InnerMain>
              {showTopicModal && <ChannelTopicModal />}
              <ChannelsSidebar />

              <TextChannelContainer />
            </Styles.InnerMain>
            {isDomThreadsPanelOpen && <ThreadPanel />}
          </Styles.Main>
        </MessageRendererRoot>
      )}
    </MessageRendererProvider>
  );
}

export default memo(GuildChannel);
