import React from 'react';
import { TextChannelHeader } from '@components/Core/TextChannelContainer/TextChannelHeader';
import { useStoreState } from '@state';
import * as Styles from '@components/Sidebar/styles';
import { WbIcon } from '@icons/WbIcon';

export default function GuildIndex() {
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  return (
    <Styles.GuildRoot
      mobile={{
        '@initial': false,
        '@small': true
      }}
      channelsListOpen={isChannelsListOpen}
    >
      <TextChannelHeader channelName="Select a channel" topic="Pick a channel from the left" />

      <Styles.WbIconContainer>
        <WbIcon />
      </Styles.WbIconContainer>
    </Styles.GuildRoot>
  );
}
