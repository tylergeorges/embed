import { useStoreActions, useStoreState } from '@state';
import { Header } from '@components/Header';
import { ModalBackdrop } from '@components/Overlays/Modal/elements';
import { useAppRouter, useContextMenu, useMediaQuery } from '@lib/hooks';
import { Category } from './Category/Category';
import { ChannelHighlighter } from './ChannelHighlighter';
import { ChannelsSidebarWrapper } from '../elements';

/** This component displays the channels for the given guild, it wraps
 *  the guild header and all of the guilds channels.
 *
 */
export const ChannelsList = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { channelId, threadId } = useAppRouter();
  const { hideContextMenu } = useContextMenu();
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const guildName = useStoreState(state => state.guild.data?.name) as string;
  const categories = useStoreState(state => state.guild.categories);

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  if (!categories) return <div>Loading...</div>;

  const closeSidebar = () => {
    setIsChannelsListOpen(false);
  };

  return (
    <>
      <ChannelsSidebarWrapper
        type="channels_list"
        channelsListOpen={isChannelsListOpen}
        className="channels-sidebar_wrapper"
        css={{
          zIndex: 11
        }}
        onClick={hideContextMenu}
      >
        <div className="sidebar-header_container">
          <Header name={guildName} isChannelHeader={false} />
        </div>

        <div className="sidebar-children_container">
          <ChannelHighlighter />

          {categories.map(category => (
            <Category
              currentChannelID={channelId}
              currentThreadID={threadId}
              category={category}
              key={category.id}
            />
          ))}
        </div>
      </ChannelsSidebarWrapper>
      <ModalBackdrop
        isOpen={windowIsMobile ? !!isChannelsListOpen : false}
        onClick={closeSidebar}
      />
    </>
  );
};
