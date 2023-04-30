import { Hash } from '@components/Shared/Channel/elements';
import { useCallback, useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from '@hooks/storeHooks';
import { Channel } from '@graphql/graphql';
import { ChannelNameWrapper, ChannelNameInner } from './elements';

interface ChannelNameProps {
  /** Check if the channel is the current channel selected. */
  isActive: boolean;

  channel: Channel;
}

/** Component that handles rendering of each channel name. */
export const ChannelName = ({ channel, isActive }: ChannelNameProps) => {
  const initialRef = useRef<HTMLAnchorElement>(null);

  // Store actions
  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);
  const setCurrentChannel = useStoreActions(state => state.ui.setCurrentChannel);

  // Store state
  const guildID = useStoreState(state => state.ui.guildData?.guildID) as string;

  useEffect(() => {
    if (initialRef.current) {
      // Set the initial Y position for select component which makes the current channel's
      // background light up,
      setCurrentChannelYPos(initialRef.current.offsetTop);
    }
  }, []);

  /** Sets the new select component's y position because we clicked on a new
   *  channel.
   */
  const handleChannelClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setCurrentChannelYPos(e.currentTarget.offsetTop);
      setCurrentChannel(channel);
    },
    [setCurrentChannel]
  );

  return (
    <ChannelNameWrapper key={channel.id} draggable={false} onClick={handleChannelClick}>
      <ChannelNameInner
        active_state={isActive}
        href={`/channels/${guildID}/${channel.id}`}
        ref={isActive ? initialRef : undefined} // We only want to set the ref for the current channel
        draggable={false}
      >
        <Hash />
        {channel.name}
      </ChannelNameInner>
    </ChannelNameWrapper>
  );
};
