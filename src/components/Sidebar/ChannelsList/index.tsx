import { useStoreActions, useStoreState } from '@state';
import { Header } from '@components/Header';
import { ModalBackdrop } from '@components/Overlays/Modal/styles';
import { useContextMenu, useMediaQuery } from '@lib/hooks';
import { Category } from './Category/Category';
import { ChannelHighlighter } from './ChannelHighlighter';
import * as Styles from '../styles';

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
      <Styles.ChannelsSidebarWrapper
        type="channels_list"
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
      <ModalBackdrop
        isOpen={windowIsMobile ? isChannelsListOpen : false}
        onClick={closeChannelsList}
      />
    </>
  );
};
