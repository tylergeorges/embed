import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { API_URL, Endpoints } from '@lib/api/url';
import React, { useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { useAuthAPI } from '@hooks/useAuthAPI';

export const ChannelsFooterLoginButton = () => {
  const inProgressRef = useRef(false);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const isGuestMode = useStoreState(state => state.guild.settings)?.guestMode;
  // const isGuestMode = true;

  const { discordSignIn } = useAuthAPI();

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inProgressRef.current) {
      inProgressRef.current = true;

      const x: number = window.screen.width / 2 - 840 / 2;
      const y: number = window.screen.height / 2 - 700 / 2;

      console.log('is guest mode login');
      if (isGuestMode) {
        setShowGuestFormModal(true);
        inProgressRef.current = false;
      } else {
        window.open(
          `${API_URL}${Endpoints.auth.discord}`,
          'Login to WidgetBot with Discord!',
          `menubar=no,width=905,height=752,location=no,resizable=no,scrollbars=yes,status=no,left=${x},top=${y}`
        );
        window.addEventListener('message', discordSignIn);
      }
    }
  };

  useEffect(
    () => () => {
      window.removeEventListener('message', discordSignIn);
    },
    [discordSignIn]
  );

  return (
    <Styles.ChannelsFooterButtonWrapper>
      <Styles.ChannelsFooterLoginButton onClick={login}>
        <Styles.ChannelsFooterLoginButtonLabel>Login</Styles.ChannelsFooterLoginButtonLabel>
      </Styles.ChannelsFooterLoginButton>
    </Styles.ChannelsFooterButtonWrapper>
  );
};
