import { forwardRef, useCallback } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { Channel as IChannel } from '@graphql/graphql';
import { Hash } from '@components/Shared/Channel/elements';
import { Thread } from '@components/Sidebar/ChannelsList/Category/ChannelsContainer/Thread';
import { IThread } from '@state/stores/guild';
import { ChannelNameWrapper, ChannelNameInner } from '../../elements';

interface ChannelNameProps {
  /** Check if the channel is the current channel selected. */
  isActive: boolean;

  channel: IChannel | IThread;

  isCategoryOpen: boolean;

  isThread?: boolean;
}

/** Component that handles rendering of each channel name. */
export const Channel = forwardRef<HTMLAnchorElement, ChannelNameProps>(
  ({ channel, isActive, isCategoryOpen, isThread }, ref) => {
    const guildID = useStoreState(state => state.guild.data!.id) as string;
    const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);
    const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);
    const setContextMenuData = useStoreActions(state => state.ui.setContextMenuData);
    const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

    /** Sets the new select component's y position because we clicked on a new
     *  channel.
     */
    const handleChannelClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setCurrentChannelYPos(e.currentTarget.offsetTop);
      setInitChannelYPos(e.currentTarget.offsetTop);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContextMenuClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenuData({
          xPos: e.clientX,
          yPos: e.clientY,
          channelLink: `https://discord.com/channels/${guildID}/${channel.id}`
        });
        setShowContextMenu(true);
      },
      [channel.id, guildID, setShowContextMenu, setContextMenuData]
    );

    return (
      <ChannelNameWrapper
        key={channel.id}
        draggable={false}
        onClick={handleChannelClick}
        className="channel-name_wrapper"
        // if the cateogry isnt open and this text channel is currently open,
        // then this should be true
        // categoryOpen={isCategoryOpen ? true : isActive ? true : false}
        css={
          // eslint-disable-next-line no-nested-ternary
          !isActive
            ? !isCategoryOpen
              ? // if this channel name is NOT the current channel and the
                // category is closed
                {
                  position: 'relative',
                  overflow: 'hidden',
                  maxHeight: 0,
                  margin: 0,
                  padding: 0
                }
              : // if the channel name is NOT the current channel AND the category
                // is still open
                {
                  position: 'relative',
                  top: 0
                }
            : // if the channel name is the current channel do nothing
              {}
        }
        isThread={isThread}
      >
        {isThread ? (
          <>
            <Thread
              isActive={isActive}
              ref={isActive ? ref : null}
              handleContextMenuClick={handleContextMenuClick}
              thread={channel as IThread}
            />
          </>
        ) : (
          <ChannelNameInner
            active_state={isActive}
            href={`/channels/${guildID}/${channel.id}`}
            // We only want to set the ref for the current channel
            ref={isActive ? ref : null}
            draggable={false}
            className="channel-name"
            onContextMenu={handleContextMenuClick}
          >
            <Hash />

            {channel.name}
          </ChannelNameInner>
        )}
      </ChannelNameWrapper>
    );
  }
);

Channel.displayName = 'Channel';
