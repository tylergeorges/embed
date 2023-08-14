/* eslint-disable no-alert */
import { MessageRendererProvider } from '@widgetbot/message-renderer';
import { styled } from '@stitches';
import { APIChannel } from 'discord-api-types/v10';
import { svgUrls } from '@svg-assets';
import { convertUserToDiscord } from '@util/convertToDiscord/convertUserToDiscord';
import { useStoreState } from '@state';
import { convertToDiscordMember } from '@util/convertToDiscord/convertToDiscordMember';

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
  const user = useStoreState(state => state.user.data);

  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const members = useStoreState(state => state.guild.members);

  const resolveUser = (id: string) => {
    if (!members) return null;

    return convertUserToDiscord(members[id]);
  };
  const resolveMember = (id: string) => {
    if (!members) return null;

    return convertToDiscordMember(members[id]);
  };

  return (
    <MessageRendererProvider
      messageButtons={() => []}
      currentUser={() => (user !== undefined ? convertUserToDiscord(user) : null)}
      resolveChannel={(id: string) => (guildChannels[id] as APIChannel) ?? null}
      resolveGuild={() => null}
      resolveMember={resolveMember}
      resolveRole={() => null}
      resolveUser={resolveUser}
      svgUrls={svgUrls}
      seeThreadOnClick={() => null}
      userMentionOnClick={() => null}
      roleMentionOnClick={() => null}
      channelMentionOnClick={() => null}
      messageComponentButtonOnClick={() => null}
    >
      {({ themeClass }) => (
        <MessageRendererRoot className={themeClass}>{children}</MessageRendererRoot>
      )}
    </MessageRendererProvider>
  );
};
