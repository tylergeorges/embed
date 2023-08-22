import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import React, { useRef } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { useAuthApi } from '@hooks/useAuthAPI';
import { useTranslation } from 'react-i18next';

export const ChannelsFooterLoginButton = () => {
  const { t } = useTranslation();
  const inProgressRef = useRef(false);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const guildSettings = useStoreState(state => state.guild.settings);

  const { discordSignIn } = useAuthApi();

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inProgressRef.current && !guildSettings?.readonly) {
      inProgressRef.current = true;

      if (guildSettings?.guestMode) {
        setShowGuestFormModal(true);
      } else {
        discordSignIn();
      }

      inProgressRef.current = false;
    }
  };

  return (
    <Styles.ChannelsFooterButtonWrapper>
      <Styles.ChannelsFooterLoginButton onClick={login}>
        <Styles.ChannelsFooterLoginButtonLabel>
          {t('auth.login')}
        </Styles.ChannelsFooterLoginButtonLabel>
      </Styles.ChannelsFooterLoginButton>
    </Styles.ChannelsFooterButtonWrapper>
  );
};
