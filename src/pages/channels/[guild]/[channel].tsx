/* eslint-disable no-alert */
import type { NextPage } from 'next';
import * as Styles from '@components/Core';
import { ChannelsList } from '@components/Sidebar/ChannelsList';
import { ContextMenu } from '@components/Overlays/ContextMenu';
import { useContextMenu } from '@lib/hooks';
import { useStoreState } from '@state';
import { ThreadPanel } from '@components/Sidebar/ThreadPanel';
import { ChannelTopicModal } from '@components/Overlays/Modal/InformationModal/ChannelTopicModal';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import { svgUrls } from '../../../res/images/discordAssets/svgUrls';

const MessageRendererRoot = styled('div', {
  '--fonts-main': 'GgSans',
  height: '100%'
});

const GuildChannel: NextPage = () => {
  const { disableBrowserMenu } = useContextMenu();
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

            <ChannelTopicModal />
            <Styles.InnerMain>
              <ChannelsList />
              <TextChannelContainer />
              <ThreadPanel />
            </Styles.InnerMain>
          </Styles.Main>
        </MessageRendererRoot>
      )}
    </MessageRendererProvider>
  );
};

export default GuildChannel;
