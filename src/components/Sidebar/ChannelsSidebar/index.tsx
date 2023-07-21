import { useStoreActions, useStoreState } from '@state';
import { Header } from '@components/Header';
import { useContextMenu } from '@hooks/useContextMenu';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Backdrop } from '@components/Overlays/Modal/styles';
import { useCallback } from 'react';
import * as Styles from '../styles';
import Category from './Category';
import { ChannelHighlighter } from './ChannelHighlighter';

export const ChannelsSidebar = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { hideContextMenu } = useContextMenu();

  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const guildName = useStoreState(state => state.guild.data?.name) as string;
  const categories = useStoreState(state => state.guild.categories);

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const closeChannelsList = useCallback(() => {
    setIsChannelsListOpen(false);
  }, [setIsChannelsListOpen]);

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
        <Styles.GuildHeaderWrapper>
          <Header name={guildName} isChannelHeader={false} />
        </Styles.GuildHeaderWrapper>

        <Styles.ChannelsChildrenWrapper>
          <ChannelHighlighter />
          {categories
            .filter(category => category !== null)
            .map(category => (
              <Category category={category} key={category.id} />
            ))}
        </Styles.ChannelsChildrenWrapper>
      </Styles.ChannelsSidebarWrapper>
    </>
  );
};
