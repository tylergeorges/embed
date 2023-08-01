import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { API_URL, Endpoints } from '@lib/api/url';
import { fetchDiscordUser } from '@lib/api/apiRequest';
import React, { useRef } from 'react';
import { useStoreActions, useStoreState } from '@state';

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

const FooterLoginButton = () => {
  //   const inProgressRef = useState(false);
  const inProgressRef = useRef(false);

  const setUserData = useStoreActions(state => state.user.setUserData);
  const user = useStoreState(state => state.user.data);

  const receiveMessage = async ({ data, source }: WindowMessageEvent) => {
    if (!inProgressRef.current) return;

    const hasToken = !!localStorage.getItem('token');
    const hasUser = !!user;

    source = source as Window;

    function cleanUp() {
      window.removeEventListener('message', receiveMessage);
    }

    switch (data.type) {
      case 'AUTH_SUCCESS': {
        source.close();

        if (!data.token) {
          console.log('Success but no user data token was received.');
          inProgressRef.current = false;
          break;
        }

        const { token } = data;

        if (!hasToken) {
          localStorage.setItem('token', token);
        }

        if (!hasUser) {
          await fetchDiscordUser().then(user => {
            console.log(user);
            setUserData(user);
          });
        }

        console.log('Discord User Token: ', token);

        inProgressRef.current = false;
        break;
      }
      case 'AUTH_FAIL': {
        source.close();
        cleanUp();
        console.error('Auhtenticating failed: ', data.error);

        inProgressRef.current = false;
        break;
      }
      default:
        break;
    }
  };

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

  return (
    <Styles.ChannelsFooterButtonWrapper>
      <Styles.ChannelsFooterLoginButton onClick={login}>
        <Styles.ChannelsFooterLoginButtonLabel>Login</Styles.ChannelsFooterLoginButtonLabel>
      </Styles.ChannelsFooterLoginButton>
    </Styles.ChannelsFooterButtonWrapper>
  );
};

export const ChannelsFooter = () => (
  <Styles.ChannelsFooterWrapper>
    <FooterLoginButton />
    <Styles.ChannelsFooterVersionWrapper>WidgetBot v3.8.6</Styles.ChannelsFooterVersionWrapper>
  </Styles.ChannelsFooterWrapper>
);
