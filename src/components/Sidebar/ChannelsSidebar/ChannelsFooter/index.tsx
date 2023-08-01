import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import React from 'react';
import { useStoreState } from '@state';
import { ChannelsFooterUserInfo } from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/ChannelsFooterUserInfo';
import { ChannelsFooterLoginButton } from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/ChannelsFooterLoginButton';

export const ChannelsFooter = () => {
  const user = useStoreState(state => state.user.data);

  const hasUser = !!user;

  return (
    <Styles.ChannelsFooterWrapper>
      {!hasUser ? <ChannelsFooterLoginButton /> : <ChannelsFooterUserInfo />}

      <Styles.ChannelsFooterVersionWrapper>WidgetBot v3.8.6</Styles.ChannelsFooterVersionWrapper>
    </Styles.ChannelsFooterWrapper>
  );
};
