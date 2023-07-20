import { useStoreState } from '@state';
import { Header } from '@components/Header';
import { useContextMenu } from '@hooks/useContextMenu';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Backdrop } from '@components/Overlays/Modal/styles';
import ModalProvider from '@components/Providers/ModalProvider';
import * as Styles from '../styles';
import { Category } from './Category';
import { ChannelHighlighter } from './ChannelHighlighter';

interface ChannelsSidebarProps {
  isOpen: boolean;
}

export const ChannelsSidebar = ({ isOpen }: ChannelsSidebarProps) => {
  const guildName = useStoreState(state => state.guild.data?.name) as string;
  const categories = useStoreState(state => state.guild.categories);

  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  const { hideContextMenu, disableBrowserMenu } = useContextMenu();

  const closeChannelsList = () => {
    ModalProvider.hide('sidebar-channels-list');
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
        className="scrollbar-thin"
        onContextMenu={disableBrowserMenu}
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
