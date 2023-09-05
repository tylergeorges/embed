/* eslint-disable no-alert */
import React, { memo } from 'react';
import { useStoreState } from '@state';
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import { svgUrls } from '@svg-assets';
import dynamic from 'next/dynamic';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import { registerModal } from '@components/Providers/ModalProvider';

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

registerModal('channel-topic-modal', ChannelTopicModal, false);
registerModal('thread-panel', ThreadPanel, false);

function GuildChannel() {
  // const showTopicModal = useStoreState(state => state.ui.showTopicModal);

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
          {/* {showTopicModal && <ChannelTopicModal />} */}

          <TextChannelContainer />

          {/* <ThreadPanel /> */}
        </MessageRendererRoot>
      )}
    </MessageRendererProvider>
  );
}

export default memo(GuildChannel);
