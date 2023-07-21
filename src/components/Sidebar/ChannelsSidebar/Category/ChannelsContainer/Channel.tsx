import { forwardRef, memo, useCallback, useRef } from 'react';
import { useStoreActions } from '@state';
import { Channel as IChannel } from '@graphql/graphql';
import { Thread } from '@components/Sidebar/ChannelsSidebar/Category/ChannelsContainer/Thread';
import { IThread } from '@state/stores/guild';
import * as Styles from '@components/Sidebar/ChannelsSidebar/styles';
import { useRouter } from 'next/router';
import { ChannelIcon } from './ChannelIcon';

interface ChannelNameProps {
  /** Check if the channel is the current channel selected. */
  isActive: boolean;

  isCategoryOpen: boolean;

  channelHasActiveThread: boolean;

  channel: IChannel | IThread;

  isThread?: boolean;
}

/** Component that handles rendering of each channel name. */
const Channel = forwardRef<HTMLAnchorElement, ChannelNameProps>(
  ({ channel, isActive, isCategoryOpen, isThread, channelHasActiveThread }, ref) => {
    const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

    const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);

    const setContextMenuData = useStoreActions(state => state.ui.setContextMenuData);

    const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

    const { channel: channelId, guild: guildId } = useRef(useRouter().query).current;

    const handleChannelClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        setCurrentChannelYPos(e.currentTarget.offsetTop);

        setInitChannelYPos(e.currentTarget.offsetTop);
      },
      [setInitChannelYPos, setCurrentChannelYPos]
    );

    const handleContextMenuClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();

        setContextMenuData({
          xPos: e.clientX,
          yPos: e.clientY,
          channelLink: `https://discord.com/channels/${guildId}/${channel.id}`
        });

        setShowContextMenu(true);
      },
      [channel.id, guildId, setContextMenuData, setShowContextMenu]
    );

    return (
      <Styles.ChannelNameWrapper
        key={channel.id}
        draggable={false}
        isActive={isActive}
        isCategoryOpen={isCategoryOpen}
        isThread={isThread}
        onContextMenu={handleContextMenuClick}
        onClick={handleChannelClick}
      >
        {isThread ? (
          <Thread
            isActive={isActive}
            ref={isActive ? ref : null}
            handleContextMenuClick={handleContextMenuClick}
            thread={channel as IThread}
            currentChannelUrl={`/channels/${guildId}/${channelId}`}
          />
        ) : (
          <Styles.ChannelNameInner
            isActive={isActive && !channelHasActiveThread}
            href={`/channels/${guildId}/${channel.id}`}
            // href={`/channels/${guildId}/${channel.id}`}
            // Dont set ref if the channel has a thread opened
            // eslint-disable-next-line no-nested-ternary
            ref={isActive ? (channelHasActiveThread ? null : ref) : null}
            draggable={false}
            // ! USES CLASSNAME FROM GLOBAL CSS SO THE CHANNEL HIGHLIGHTER AND CHANNEL NAME
            // ! GET FORMATTED THE SAME
            className="channel-name"
            shallow
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
Channel.whyDidYouRender = true;

export default memo(Channel);
