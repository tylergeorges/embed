import { useCallback, useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { Channel } from '@graphql/graphql';
import { Hash } from '@components/Shared/Channel/elements';
import { ChannelNameWrapper, ChannelNameInner } from './elements';

interface ChannelNameProps {
  /** Check if the channel is the current channel selected. */
  isActive: boolean;

  channel: Channel;
}

/** Component that handles rendering of each channel name. */
export const ChannelName = ({ channel, isActive }: ChannelNameProps) => {
  const initialRef = useRef<HTMLAnchorElement>(null);

  const guildID = useStoreState(state => state.guild.data!.id) as string;

  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

  useEffect(() => {
    if (initialRef.current) {
      // Set the initial Y position for select component which makes the current channel's
      // background light up,
      setCurrentChannelYPos(initialRef.current.offsetTop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Sets the new select component's y position because we clicked on a new
   *  channel.
   */
  const handleChannelClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCurrentChannelYPos(e.currentTarget.offsetTop);
  }, []);

  return (
    <ChannelNameWrapper key={channel.id} draggable={false} onClick={handleChannelClick}>
      <ChannelNameInner
        active_state={isActive}
        href={`/channels/${guildID}/${channel.id}`}
        // We only want to set the ref for the current channel
        ref={isActive ? initialRef : undefined}
        draggable={false}
      >
        <Hash />
        {channel.name}
      </ChannelNameInner>
    </ChannelNameWrapper>
  );
};
