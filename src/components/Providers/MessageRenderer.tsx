import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { svgUrls } from '@svg-assets';
import { convertUserToDiscord } from '@util/convertToDiscord/convertUserToDiscord';
import { convertUserToMember } from '@util/convertToDiscord/convertUserToMember';
import { useStoreActions, useStoreState } from '@state';
import { convertChannelToDiscord } from '@util/convertToDiscord/convertChannelToDiscord';
import { useAppRouter } from '@hooks/useAppRouter';
import { Channel } from '@graphql/graphql';
import { convertGuild } from '@util/convertToDiscord/convertGuild';
import { gql, useApolloClient } from '@apollo/client';

const MessageRendererRoot = styled('div', {
  height: '100%',
  width: '100%',
  '*': {
    fontFamily: 'GgSans'
  }
});

interface MessageRendererWrapperProps {
  children: React.ReactNode;
}

export const MessageRenderer = ({ children }: MessageRendererWrapperProps) => {
  const { router, guildId } = useAppRouter();

  const user = useStoreState(state => state.user.data);

  const guild = useStoreState(state => state.guild.data);
  const roles = useStoreState(state => state.guild.roles);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);
  const client = useApolloClient();

  const resolveRole = (id: string): APIRole | null => {
    if (!roles) return null;

    const role = roles.get(id);

    if (!role) return null;

    return {
      color: role.color,
      hoist: false,
      id: role.id,
      name: role.name,
      managed: false,
      mentionable: false,
      permissions: '',
      position: role.position,
      icon: role?.icon,
      unicode_emoji: role?.unicodeEmoji ? ` ${role.unicodeEmoji}` : null
    };
  };

  const resolveUserFromCache = (id: string) => {
    const user = client.readFragment({
      id: `User:${id}`,

      fragment: gql`
        fragment User on User {
          id
          name
        }
      `
    });

    const mention = client.readFragment({
      id: `Mention:${id}`,

      fragment: gql`
        fragment mention on Mention {
          id
          name
        }
      `
    });

    return mention && 'name' in mention ? mention : user;
  };

  const resolveUser = (id: string) => {
    const user = resolveUserFromCache(id);

    return convertUserToDiscord(user);
  };

  const resolveMember = (id: string) => {
    const member = client.readFragment({
      id: `User:${id}`,

      fragment: gql`
        fragment Member on User {
          id
          name
          avatarUrl
          discrim
          bot
          isWebhook
          system
          flags
          roles
        }
      `
    });

    return convertUserToMember(member);
  };

  const channelMentionOnClick = (channel: APIChannel) => {
    const isChannelThread =
      channel.type === ChannelType.PublicThread || channel.type === ChannelType.PrivateThread;

    if (isChannelThread) {
      // Open thread panel
      setIsDomThreadsPanelOpen(true);
      setIsMembersListOpen(false);
      setCurrentThread(guildChannels[channel.id] as Channel);

      router.push(`/channels/${guildId}/${channel.parent_id}?thread=${channel.id}`);
    } else {
      router.push(`/channels/${guildId}/${channel.id}`);
    }
  };

  return (
    <MessageRendererProvider
      messageButtons={() => []}
      currentUser={() => (user ? convertUserToDiscord(user) : null)}
      resolveChannel={id => convertChannelToDiscord(guildChannels[id] as Channel)}
      resolveGuild={() => (guild ? convertGuild(guild) : null)}
      resolveMember={resolveMember}
      resolveRole={resolveRole}
      resolveUser={resolveUser}
      svgUrls={svgUrls}
      seeThreadOnClick={() => null}
      userMentionOnClick={() => null}
      roleMentionOnClick={() => null}
      channelMentionOnClick={channelMentionOnClick}
      messageComponentButtonOnClick={() => null}
    >
      {({ themeClass }) => (
        <MessageRendererRoot className={themeClass}>{children}</MessageRendererRoot>
      )}
    </MessageRendererProvider>
  );
};
