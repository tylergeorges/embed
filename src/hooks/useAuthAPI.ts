import { fetchDiscordUser, guestLogin, guildLogin } from '@lib/api/apiRequest';
import { useStoreActions } from '@state';
import { useCallback, useRef } from 'react';

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

export const useAuthAPI = () => {
  const inProgressRef = useRef(false);
  const setUserData = useStoreActions(state => state.user.setUserData);

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
          switch (res.type) {
            case 'AUTH_SUCCESS': {
              if (!res.token) {
                inProgressRef.current = false;
                break;
              }

              const { token } = res;

              localStorage.setItem('token', token);
              setUserData(res.user);

              inProgressRef.current = false;
              break;
            }
            case 'AUTH_ERROR': {
              console.error('Auhtenticating failed: ', res);

              inProgressRef.current = false;
              break;
            }
            default:
              break;
          }
        })
        .catch(err => {
          console.error(err);
        });

      inProgressRef.current = false;
    },
    [setUserData]
  );

  const discordSignIn = useCallback(
    async ({ data, source }: WindowMessageEvent) => {
      const hasToken = !!localStorage.getItem('token');

      if (inProgressRef.current || hasToken) return;

      source = source as Window;

      switch (data.type) {
        case 'AUTH_SUCCESS': {
          source.close();

          if (!data.token) {
            inProgressRef.current = false;
            return;
          }

          const { token } = data;

          localStorage.setItem('token', token);

          fetchDiscordUser({ userToken: token })
            .then(user => {
              console.log('discord ', user);
              setUserData(user);
            })
            .catch(err => {
              console.error(err);
            });
          return;
          break;
        }
        case 'AUTH_FAIL': {
          source.close();
          window.removeEventListener('message', discordSignIn);
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

  const guildSignIn = useCallback(
    async (guild: string, token: string) => {
      const hasToken = !!localStorage.getItem('token');

      if (hasToken) return;

      guildLogin({ guild, token })
        .then(res => {
          console.log('guild data: ', res);

          switch (res.type) {
            case 'AUTH_SUCCESS': {
              if (!res.token) {
                inProgressRef.current = false;
                break;
              }

              const { token } = res;

              localStorage.setItem('token', token);
              setUserData(res.user);

              inProgressRef.current = false;
              break;
            }
            case 'AUTH_ERROR': {
              console.error('Auhtenticating failed: ', res.message);

              inProgressRef.current = false;
              break;
            }
            default:
              break;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    [setUserData]
  );

  return { guestSignIn, discordSignIn, guildSignIn };
};
