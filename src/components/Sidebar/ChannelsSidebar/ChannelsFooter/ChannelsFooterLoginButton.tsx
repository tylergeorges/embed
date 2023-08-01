import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { API_URL, Endpoints } from '@lib/api/url';
import { fetchDiscordUser } from '@lib/api/apiRequest';
import React, { useCallback, useEffect, useRef } from 'react';
import { useStoreActions } from '@state';

interface WindowMessageEvent extends MessageEvent {
  data:
    | {
        type: 'AUTH_FAIL';
        error: string;
      }
    | {
        type: 'AUTH_SUCCESS';
        token?: string;
      };
}

export const ChannelsFooterLoginButton = () => {
  const inProgressRef = useRef(false);

  const setUserData = useStoreActions(state => state.user.setUserData);

  const receiveMessage = useCallback(
    async ({ data, source }: WindowMessageEvent) => {
      if (!inProgressRef.current) return;

      const hasToken = !!localStorage.getItem('token');

      source = source as Window;

      switch (data.type) {
        case 'AUTH_SUCCESS': {
          source.close();

          if (!data.token) {
            inProgressRef.current = false;
            break;
          }

          const { token } = data;

          if (!hasToken) {
            localStorage.setItem('token', token);
            await fetchDiscordUser().then(user => {
              setUserData(user);
            });
          }

          inProgressRef.current = false;
          break;
        }
        case 'AUTH_FAIL': {
          source.close();
          window.removeEventListener('message', receiveMessage);
          console.error('Auhtenticating failed: ', data.error);

          inProgressRef.current = false;
          break;
        }
        default:
          break;
      }
    },
    [setUserData]
  );

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inProgressRef.current) {
      inProgressRef.current = true;

      const x: number = window.screen.width / 2 - 840 / 2;
      const y: number = window.screen.height / 2 - 700 / 2;

      window.open(
        `${API_URL}${Endpoints.auth.discord}`,
        'Login to WidgetBot with Discord!',
        `menubar=no,width=905,height=752,location=no,resizable=no,scrollbars=yes,status=no,left=${x},top=${y}`
      );
    }

    window.addEventListener('message', receiveMessage);
  };

  useEffect(
    () => () => {
      window.removeEventListener('message', receiveMessage);
    },
    [receiveMessage]
  );

  return (
    <Styles.ChannelsFooterButtonWrapper>
      <Styles.ChannelsFooterLoginButton onClick={login}>
        <Styles.ChannelsFooterLoginButtonLabel>Login</Styles.ChannelsFooterLoginButtonLabel>
      </Styles.ChannelsFooterLoginButton>
    </Styles.ChannelsFooterButtonWrapper>
  );
};
