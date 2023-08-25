import { APIDiscordResponse, AuthResponse, HandleAuthMessageResponse } from '@lib/api/api.types';
import { fetchLatestProfile, guestLogin, guildLogin } from '@lib/api/apiRequest';
import { API_URL, Endpoints } from '@lib/api/url';
import { useStoreActions } from '@state';
import { useCallback, useEffect, useRef } from 'react';
import { GuestUser, GuildUser, DiscordUser, AuthUser } from 'types/user.types';

interface WindowMessageEvent extends MessageEvent {
  data: APIDiscordResponse;
}

export const useAuthApi = () => {
  const inProgressRef = useRef(false);
  const setUserData = useStoreActions(state => state.user.setUserData);
  const setRefetchGuild = useStoreActions(state => state.guild.setRefetchGuild);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const handleAuthMessage = useCallback(
    <T extends AuthUser>(authRes: AuthResponse<T>): HandleAuthMessageResponse<T> | undefined => {
      switch (authRes.type) {
        case 'AUTH_SUCCESS': {
          if (!authRes.token) {
            inProgressRef.current = false;

            console.error(authRes);
            return { type: 'ERROR', message: authRes.type };
          }

          console.log(authRes);
          const { token } = authRes;
          localStorage.setItem('token', token);
          setShowGuestFormModal(false);

          setRefetchGuild(true);
          inProgressRef.current = false;

          return { type: 'SUCCESS', data: authRes } as HandleAuthMessageResponse<T>;
        }

        case 'AUTH_FAIL':
        case 'AUTH_ERROR': {
          console.error('Auhtenticating failed: ', authRes);
          console.log(authRes);

          inProgressRef.current = false;

          if (authRes.type === 'AUTH_ERROR') {
            return { type: 'ERROR', message: authRes.message };
          }

          return { type: 'ERROR', message: authRes.error };
        }

        default:
          break;
      }
    },
    [setRefetchGuild, setShowGuestFormModal]
  );

  const guestSignIn = useCallback(
    async (username: string) => {
      const hasToken = !!localStorage.getItem('token');

      if (!username || hasToken || inProgressRef.current) return;

      const buttonDisabled = !username.trim();

      if (buttonDisabled) return;

      inProgressRef.current = true;

      const trimmedUsername = username.trim();

      guestLogin({ username: trimmedUsername })
        .then(res => {
          const guestData = handleAuthMessage<GuestUser>(res);

          if (!guestData) return;

          if (guestData.type === 'ERROR') return;

          setUserData(guestData.data.user);
        })
        .catch(err => {
          console.error(err);
        });
    },
    [setUserData, handleAuthMessage]
  );

  const receiveDiscordAuthMessage = useCallback(
    ({ data, source }: WindowMessageEvent) => {
      source = source as Window;

      source.close();
      const discordUserData = handleAuthMessage<DiscordUser>(data);

      if (!discordUserData) return;

      if (discordUserData.type === 'ERROR') {
        console.error('Auhtenticating failed: ', discordUserData.message);
      } else {
        fetchLatestProfile({ userToken: discordUserData.data.token })
          .then(user => {
            setUserData(user);
            window.removeEventListener('message', receiveDiscordAuthMessage);
          })
          .catch(err => {
            console.error(err);
            window.removeEventListener('message', receiveDiscordAuthMessage);
          });
      }
    },
    [setUserData, handleAuthMessage]
  );

  const discordSignIn = useCallback(() => {
    const hasToken = !!localStorage.getItem('token');

    if (inProgressRef.current || hasToken) return;

    inProgressRef.current = true;

    const x: number = window.screen.width / 2 - 840 / 2;
    const y: number = window.screen.height / 2 - 700 / 2;

    window.open(
      `${API_URL}${Endpoints.auth.discord}`,
      'Login to WidgetBot with Discord!',
      `menubar=no,width=905,height=752,location=no,resizable=no,scrollbars=yes,status=no,left=${x},top=${y}`
    );

    window.addEventListener('message', receiveDiscordAuthMessage);
  }, [receiveDiscordAuthMessage]);

  const guildSignIn = useCallback(
    async (guild: string, token: string) => {
      const hasToken = !!localStorage.getItem('token');

      if (hasToken) return;

      guildLogin({ guild, token })
        .then(res => {
          const guildData = handleAuthMessage<GuildUser>(res);

          if (!guildData) return;

          if (guildData.type === 'ERROR') {
            console.error('Auhtenticating failed: ', guildData.message);
            return;
          }

          setUserData(guildData.data.user);
        })
        .catch(err => {
          console.error(err);
        });
    },
    [setUserData, handleAuthMessage]
  );

  useEffect(
    () => () => window.removeEventListener('message', receiveDiscordAuthMessage),
    [receiveDiscordAuthMessage]
  );

  return { guestSignIn, discordSignIn, guildSignIn };
};
