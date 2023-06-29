import { forwardRef, useCallback } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { ChannelType, Channel as IChannel } from '@graphql/graphql';
import { Fourm, News } from '@components/Shared/Channel/styles';
import { Thread } from '@components/Sidebar/ChannelsList/Category/ChannelsContainer/Thread';
import { IThread } from '@state/stores/guild';
import { useAppRouter } from '@lib/hooks';
import { Icons } from '@components/Shared/Icons/Icons';
import * as Styles from '../../styles';

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
    const { channelId } = useAppRouter();

    const currentGuildUrl = `/channels/${guildID}`;

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
      <Styles.ChannelNameWrapper
        key={channel.id}
        draggable={false}
        onClick={handleChannelClick}
        className="non-dragable"
        isActive={isActive}
        isCategoryOpen={isCategoryOpen}
        isThread={isThread}
        onContextMenu={handleContextMenuClick}
      >
        {isThread ? (
          <Thread
            isActive={isActive}
            ref={isActive ? ref : null}
            handleContextMenuClick={handleContextMenuClick}
            thread={channel as IThread}
            currentChannelUrl={`${currentGuildUrl}/${channelId}`}
          />
        ) : (
          <Styles.ChannelNameInner
            active_state={isActive}
            href={`${currentGuildUrl}/${channel.id}`}
            ref={isActive ? ref : null}
            draggable={false}
            // ! USES CLASS FROM GLOBAL CSS SO THE CHANNEL HIGHLIGHTER AND CHANNEL NAME
            // ! GET FORMATTED THE SAME
            className="channel-name"
            onContextMenu={handleContextMenuClick}
          >
            {channel.type === ChannelType.GuildText && (
              <Icons name="TextChannelHash" color="dark" size="small" />
            )}

            {channel.type === ChannelType.GuildAnnouncement && <News />}

            {channel.type === ChannelType.GuildForum && <Fourm />}

            {channel.name}
          </Styles.ChannelNameInner>
        )}
      </Styles.ChannelNameWrapper>
    );
  }
);

Channel.displayName = 'Channel';
