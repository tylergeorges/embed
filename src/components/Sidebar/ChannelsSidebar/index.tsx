import { useStoreState } from '@state';
import { Header } from '@components/Header';
import { useContextMenu } from '@hooks/useContextMenu';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Backdrop } from '@components/Overlays/Modal/styles';
import { useModal } from '@components/Providers/ModalProvider';
import { Channel } from '@components/Sidebar/ChannelsSidebar/Category/ChannelsContainer/Channel';
import { useAppRouter } from '@hooks/useAppRouter';
import { useRef } from 'react';
import * as Styles from '../styles';
import { Category } from './Category';
import { ChannelHighlighter } from './ChannelHighlighter';

interface ChannelsSidebarProps {
  isOpen: boolean;
}
export const ChannelsSidebar = ({ isOpen }: ChannelsSidebarProps) => {
  const { channelId, threadId } = useAppRouter();

  const { closeModal, waitForElementRef, removeAfterTransitionEnd } = useModal({
    modalId: 'sidebar-channels-list',
    openByDefault: isOpen
  });

  const guildName = useStoreState(state => state.guild.data?.name) as string;
  const categories = useStoreState(state => state.guild.categories);
  const channels = useStoreState(state => state.guild.channels);

  const channelRef = useRef<HTMLAnchorElement>(null);

  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  const { hideContextMenu, disableBrowserMenu } = useContextMenu();

  const closeChannelsList = () => {
    // ModalProvider.hide('sidebar-channels-list');

    closeModal();
  };

  return (
    <>
      <Backdrop
        onClick={closeChannelsList}
        mobile={{
          '@initial': false,
          '@small': true
        }}
        isChannelsListOpen={isOpen}
        isOpen={isOpen && windowIsMobile}
      />

      <Styles.ChannelsSidebarWrapper
        type="channelsList"
        channelsListOpen={isOpen}
        onClick={hideContextMenu}
        onTransitionEnd={removeAfterTransitionEnd}
        className="scrollbar-thin"
        onContextMenu={disableBrowserMenu}
        ref={waitForElementRef}
      >
        <Styles.GuildHeaderWrapper>
          <Header name={guildName} isChannelHeader={false} />
        </Styles.GuildHeaderWrapper>

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
