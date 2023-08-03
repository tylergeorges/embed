import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import React, { useRef } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { useAuthAPI } from '@hooks/useAuthAPI';

export const ChannelsFooterLoginButton = () => {
  const inProgressRef = useRef(false);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const isGuestMode = useStoreState(state => state.guild.settings)?.guestMode;

  const { discordSignIn } = useAuthAPI();

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inProgressRef.current) {
      inProgressRef.current = true;

      if (isGuestMode) {
        setShowGuestFormModal(true);
        inProgressRef.current = false;
      } else {
        discordSignIn();
      }
    }
  };

  return (
    <Styles.ChannelsFooterButtonWrapper>
      <Styles.ChannelsFooterLoginButton onClick={login}>
        <Styles.ChannelsFooterLoginButtonLabel>Login</Styles.ChannelsFooterLoginButtonLabel>
      </Styles.ChannelsFooterLoginButton>
    </Styles.ChannelsFooterButtonWrapper>
  );
};
