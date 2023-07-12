import { useStoreActions, useStoreState } from '@state';
import { Header } from '@components/Header';
import { useContextMenu } from '@hooks/useContextMenu';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Backdrop } from '@components/Overlays/Modal/styles';
import * as Styles from '../styles';
import { Category } from './Category';
import { ChannelHighlighter } from './ChannelHighlighter';

export const ChannelsList = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { hideContextMenu } = useContextMenu();

  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const guildName = useStoreState(state => state.guild.data?.name) as string;
  const categories = useStoreState(state => state.guild.categories);

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
      >
        <div className="sidebar-header_container">
          <Header name={guildName} isChannelHeader={false} />
        </div>

        <div className="sidebar-children_container">
          <ChannelHighlighter />

          {categories
            .filter(category => category !== null)
            .map(category => (
              <Category category={category} key={category.id} />
            ))}
        </div>
      </Styles.ChannelsSidebarWrapper>
    </>
  );
};
