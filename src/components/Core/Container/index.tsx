import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@lib/hooks';
import { MembersList } from '@components/Sidebar/MembersList';
import { useCallback, useEffect } from 'react';
import { TextChannelInnerWrapper, TextChannelWrapper } from './elements';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';

/** The overall text channel view container.
 *
 * This component contains the message input to send messages,
 * the current text channels header, and all the messages for the current text channel.
 *
 */
export const Container = () => {
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

  const guildName = useStoreState(state => state.guild.data?.name);

  // TODO: Write a hook (useCurrentChannel) or something to pull channel id from url & get it from state.guild.channels.
  const currentChannel: any = null;

  useEffect(() => {
    setIsMembersListOpen(!windowIsMobile);
  }, [windowIsMobile, setIsMembersListOpen]);
  // const translate = useTranslation();

  const hideSidebar = useCallback(() => {
    if ((windowIsMobile && isChannelsListOpen) || (windowIsMobile && isMembersListOpen)) {
      setIsChannelsListOpen(false);
      setIsMembersListOpen(false);
    }
  }, [
    isChannelsListOpen,
    isMembersListOpen,
    windowIsMobile,
    setIsMembersListOpen,
    setIsChannelsListOpen
  ]);

  if (!guildName) return <div>Loading...</div>;

  return (
    <TextChannelWrapper
      className="text-channel_wrapper"
      css={{
        '@media screen  and (max-width: 768px)': {
          transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',

          // ! assuming the members side bar is still open
          marginLeft: '0px !important',
          width: '100% !important',
          height: '100%'
        }
      }}
      channelsListOpen={isChannelsListOpen}
    >
      <TextChannelHeader channelName={currentChannel?.name as string} />
      <TextChannelInnerWrapper
        className="text-channel_inner_wrapper"
        css={{
          '@media screen  and (max-width: 768px)': {
            transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',

            // ! assuming the members side bar is still open
            marginRight: '0px !important',
            width: '100% !important',
            height: '100%',
            '&::after': {
              transition: 'opacity 0.5s ease 0s',
              content: '',
              opacity: isChannelsListOpen || isMembersListOpen ? 1 : 0
            }
          }
        }}
      >
        <MessageContainer guildName={guildName} onClick={hideSidebar} />

        {/* <TextBox
          channelName={
            translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string
          
        /> */}
        <MembersList />
      </TextChannelInnerWrapper>
    </TextChannelWrapper>
  );
};
