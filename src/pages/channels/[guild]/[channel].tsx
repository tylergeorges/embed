/* eslint-disable no-alert */
import React, { memo } from 'react';
import { useStoreState } from '@state';
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import { svgUrls } from '@svg-assets';
import dynamic from 'next/dynamic';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import GuildProvider from '@components/Providers/GuildProvider';

const MessageRendererRoot = styled('div', {
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

function GuildChannel() {
  const isDomThreadsPanelOpen = useStoreState(state => state.ui.isDomThreadsPanelOpen);

  const showTopicModal = useStoreState(state => state.ui.showTopicModal);

  const guildChannels = useStoreState(state => state.guild.guildChannels);

  return (
    <GuildProvider>
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
            {showTopicModal && <ChannelTopicModal />}

            <TextChannelContainer />

            {isDomThreadsPanelOpen && <ThreadPanel />}
          </MessageRendererRoot>
        )}
      </MessageRendererProvider>
    </GuildProvider>
  );
}

export default memo(GuildChannel);
