import { forwardRef, useEffect } from 'react';
import { useStoreActions } from '@state';
import { Channel as IChannel, ThreadChannel as IThread, ThreadChannel } from '@graphql/graphql';
import { Thread } from '@components/Sidebar/ChannelsSidebar/Category/ChannelsContainer/Thread';
import { useAppRouter } from '@hooks/useAppRouter';
import * as Styles from '@components/Sidebar/ChannelsSidebar/styles';

import { ChannelIcon } from './ChannelIcon';

interface ChannelNameProps {
  /** Check if the channel is the current channel selected. */
  isActive: boolean;

  isCategoryOpen?: boolean;

  channelHasActiveThread: boolean;

  channel: IChannel | IThread;

  isThread?: boolean;
}

/** Component that handles rendering of each channel name. */
export const Channel = forwardRef<HTMLAnchorElement, ChannelNameProps>(
  ({ channel, isActive, isCategoryOpen, isThread, channelHasActiveThread }, ref) => {
    const { channelId, guildId, router } = useAppRouter();

    const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);
    const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);
    const setContextMenuData = useStoreActions(state => state.ui.setContextMenuData);
    const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

    useEffect(() => {
      if (isActive && ref) {
        const channelRef = ref as React.MutableRefObject<HTMLAnchorElement>;
        const channelEle = channelRef.current;

        setCurrentChannelYPos(channelEle.offsetTop);
        setInitChannelYPos(channelEle.offsetTop);
      }
    }, [setCurrentChannelYPos, setInitChannelYPos, isActive, ref]);

    const handleChannelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setCurrentChannelYPos(e.currentTarget.offsetTop);
      setInitChannelYPos(e.currentTarget.offsetTop);

      router.push(`/channels/${guildId}/${channel.id}`);
    };

    const handleContextMenuClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenuData({
        xPos: e.clientX,
        yPos: e.clientY,
        channelLink: `https://discord.com/channels/${guildId}/${channel.id}`
      });
      setShowContextMenu(true);
    };

    return (
      <Styles.ChannelNameWrapper
        key={channel.id}
        draggable={false}
        isActive={isActive}
        onClick={handleChannelClick}
        isCategoryOpen={isCategoryOpen}
        isThread={isThread}
        onContextMenu={handleContextMenuClick}
      >
        {isThread ? (
          <Thread
            isActive={isActive}
            ref={isActive ? ref : null}
            handleContextMenuClick={handleContextMenuClick}
            thread={channel as ThreadChannel}
            currentChannelUrl={`/channels/${guildId}/${channelId}`}
          />
        ) : (
          <Styles.ChannelNameInner
            isActive={isActive && !channelHasActiveThread}
            href={`/channels/${guildId}/${channel.id}`}
            // Dont set ref if the channel has a thread opened
            // eslint-disable-next-line no-nested-ternary
            ref={isActive ? (channelHasActiveThread ? null : ref) : null}
            draggable={false}
            // ! USES CLASSNAME FROM GLOBAL CSS SO THE CHANNEL HIGHLIGHTER AND CHANNEL NAME
            // ! GET FORMATTED THE SAME
            className="channel-name"
          >
            <Styles.ChannelNameIconWrapper draggable={false}>
              <ChannelIcon channelType={channel.type} />
            </Styles.ChannelNameIconWrapper>

            <Styles.ChannelNameContent draggable={false}> {channel.name}</Styles.ChannelNameContent>
          </Styles.ChannelNameInner>
        )}
      </Styles.ChannelNameWrapper>
    );
  }
);

Channel.displayName = 'Channel';
