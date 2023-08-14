import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { ChannelsFooterUserInfo } from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/ChannelsFooterUserInfo';
import { ChannelsFooterLoginButton } from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/ChannelsFooterLoginButton';

export const ChannelsFooter = () => {
  const user = useStoreState(state => state.user.data);

  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  useEffect(() => {
    if (user) {
      setShowGuestFormModal(false);
    }
  }, [setShowGuestFormModal, user]);

  return (
    <Styles.ChannelsFooterWrapper>
      {!user ? <ChannelsFooterLoginButton /> : <ChannelsFooterUserInfo />}

      <Styles.ChannelsFooterVersionWrapper>WidgetBot v3.8.6</Styles.ChannelsFooterVersionWrapper>
    </Styles.ChannelsFooterWrapper>
  );
};
