/* eslint-disable no-alert */
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { svgUrls } from '@svg-assets';
import { convertUserToDiscord } from '@util/convertToDiscord/convertUserToDiscord';
import { useStoreActions, useStoreState } from '@state';
import { convertToDiscordMember } from '@util/convertToDiscord/convertToDiscordMember';
import { convertChannelToDiscord } from '@util/convertToDiscord/convertChannelToDiscord';
import { useAppRouter } from '@hooks/useAppRouter';
import { Channel } from '@graphql/graphql';

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
  const members = useStoreState(state => state.guild.members);

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const resolveUser = (id: string) => {
    if (!members) return null;

    return convertUserToDiscord(members[id]);
  };
  const resolveMember = (id: string) => {
    if (!members) return null;

    return convertToDiscordMember(members[id]);
  };

  const resolveRole = (id: string) => {
    if (!roles) return null;

    const role = roles.get(id) ?? null;

    return role as APIRole;
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
      currentUser={() => (user !== undefined ? convertUserToDiscord(user) : null)}
      resolveChannel={id => convertChannelToDiscord(guildChannels[id] as Channel)}
      // @ts-expect-error
      // Guild type mismatch
      resolveGuild={guild}
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
