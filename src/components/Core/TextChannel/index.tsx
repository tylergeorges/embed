import { useTranslation } from 'react-i18next';
import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@lib/hooks';
import { TextChannelWrapper } from './elements';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';
import { TextBox } from './TextBox';

/** The overall text channel view container.
 *
 * This component contains the message input to send messages,
 * the current text channels header, and all the messages for the current text channel.
 *
 */
export const TextChannel = () => {
  // Used to check if the screen size is mobile because if it is then the sidebars
  // hover over the text channel and we want to be able to close them by clicking on
  // the text channel.
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  // boolean check for sidebar lists
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  // actions to set sidebar lists state
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

  const guildName = useStoreState(state => state.guild.data!.name);

  // TODO: Write a hook (useCurrentChannel) or something to pull channel id from url & get it from state.guild.channels.
  const currentChannel: any = null;

  const translate = useTranslation();

  const hideSidebar = () => {
    setIsChannelsListOpen(false);
    setIsMembersListOpen(false);
  };

  return (
    <TextChannelWrapper
      css={{
        '@media screen  and (max-width: 768px)': {
          transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',

          // ! assuming the members side bar is still open
          marginLeft: '0px !important',
          width: '100% !important',
          height: '100%',
          '&::after': {
            transition: 'opacity 0.5s ease 0s',
            content: '',
            opacity: isChannelsListOpen || isMembersListOpen ? 1 : 0
          }
        }
      }}
      membersListOpen={isMembersListOpen}
      channelsListOpen={isChannelsListOpen}
      onClick={
        //  Only allow clicking text channel to close sidebars if on mobile
        (windowIsMobile && isChannelsListOpen) || (windowIsMobile && isMembersListOpen)
          ? hideSidebar
          : undefined
      }
    >
      <TextChannelHeader channelName={currentChannel?.name as string} />
      <MessageContainer guildName={guildName} />
      <TextBox
        channelName={
          translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string
        }
      />
    </TextChannelWrapper>
  );
};
