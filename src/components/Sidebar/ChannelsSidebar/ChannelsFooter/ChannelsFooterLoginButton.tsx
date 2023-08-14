import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import React, { useRef } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { useAuthApi } from '@hooks/useAuthApi';

export const ChannelsFooterLoginButton = () => {
  const inProgressRef = useRef(false);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);
  const setRefetchGuild = useStoreActions(state => state.guild.setRefetchGuild);

  const isGuestMode = useStoreState(state => state.guild.settings)?.guestMode;

  const { discordSignIn } = useAuthApi();

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inProgressRef.current) {
      inProgressRef.current = true;

      if (isGuestMode) {
        setShowGuestFormModal(true);
      } else {
        discordSignIn();
      }

      inProgressRef.current = false;
      setRefetchGuild(true);
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
