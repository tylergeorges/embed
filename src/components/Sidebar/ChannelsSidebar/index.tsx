import { useStoreActions, useStoreState } from '@state';
import { useContextMenu } from '@hooks/useContextMenu';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Backdrop } from '@components/Overlays/Modal/styles';
import { Channel } from '@components/Sidebar/ChannelsSidebar/Category/ChannelsContainer/Channel';
import { useAppRouter } from '@hooks/useAppRouter';
import { useRef } from 'react';
import { GuildHeader } from '@components/Header/GuildHeader';
import * as Styles from '../styles';
import { Category } from './Category';
import { ChannelHighlighter } from './ChannelHighlighter';

export const ChannelsSidebar = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { hideContextMenu } = useContextMenu();

  const { channelId, threadId } = useAppRouter();

  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const categories = useStoreState(state => state.guild.categories);
  const channels = useStoreState(state => state.guild.channels);

  const channelRef = useRef<HTMLAnchorElement>(null);

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const closeChannelsList = () => {
    setIsChannelsListOpen(false);
  };

  return (
    <>
      <Backdrop
        onClick={closeChannelsList}
        mobile={{
          '@initial': false,
          '@small': true
        }}
        isChannelsListOpen={isChannelsListOpen}
        isOpen={isChannelsListOpen && windowIsMobile}
      />
      <Styles.ChannelsSidebarWrapper
        type="channelsList"
        channelsListOpen={isChannelsListOpen}
        onClick={hideContextMenu}
        className="scrollbar-thin"
      >
        <GuildHeader />

        <Styles.ChannelsChildrenWrapper>
          <ChannelHighlighter />

          {channels
            ?.filter(channel => channel.category === null)
            .map(channel => (
              <Channel
                ref={channelRef}
                channel={channel}
                key={channel.id}
                isActive={channel.id === channelId}
                channelHasActiveThread={!!threadId && channel.id === channelId}
              />
            ))}

          {categories
            ?.filter(category => category !== null)
            .map(category => (
              <Category category={category} key={category.id} />
            ))}
        </Styles.ChannelsChildrenWrapper>
      </Styles.ChannelsSidebarWrapper>
    </>
  );
};
