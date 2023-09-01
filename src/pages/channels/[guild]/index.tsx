import React from 'react';
import { TextChannelHeader } from '@components/Header/TextChannelHeader';
import { useStoreState } from '@state';
import * as Styles from '@components/Sidebar/styles';
import { WbIcon } from '@icons/WbIcon';
import { useTranslation } from 'react-i18next';

export default function GuildIndex() {
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const { t } = useTranslation();

  return (
    <Styles.GuildRoot
      mobile={{
        '@initial': false,
        '@small': true
      }}
      channelsListOpen={isChannelsListOpen}
    >
      <TextChannelHeader
        channelName={t('guild.channelselect') as string}
        topic={t('guild.channelselect.topic') as string}
      />

      <Styles.WbIconContainer>
        <WbIcon />
      </Styles.WbIconContainer>
    </Styles.GuildRoot>
  );
}
