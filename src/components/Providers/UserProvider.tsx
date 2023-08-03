import React, { useEffect, useRef } from 'react';
import { useStoreActions } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { fetchDiscordUser } from '@lib/api/apiRequest';
import { useAuthAPI } from '@hooks/useAuthAPI';

interface UserProviderProps {
  isUserFetched: React.MutableRefObject<boolean>;
}

export default function UserProvider({ isUserFetched }: UserProviderProps) {
  const { guildId, tokenParam, usernameParam } = useAppRouter();
  const localFetchedRef = useRef(false);

  const setUserData = useStoreActions(state => state.user.setUserData);

  const { guestSignIn, guildSignIn } = useAuthAPI();

  useEffect(() => {
    // console.log('token is set', usernameParam);
    if (!localFetchedRef.current && !isUserFetched.current) {
      console.log('FETCHING USER DATA', isUserFetched.current, localFetchedRef.current);

      const token = localStorage.getItem('token') ?? '';

      if (token) {
        fetchDiscordUser({ userToken: token })
          .then(data => {
            if (!data) {
              setUserData(undefined);
            } else {
              setUserData(data);
            }
          })
          .catch(err => {
            console.error(err);
            setUserData(undefined);
          });

        localFetchedRef.current = true;
        isUserFetched.current = true;
      } else if (!token && usernameParam) {
        console.log('usernameParam ', usernameParam);

        guestSignIn(usernameParam)
          .then(() => {})
          .catch(err => {
            console.error(err);
          });

        localFetchedRef.current = true;
        isUserFetched.current = true;
      } else if (!token && tokenParam) {
        console.log(tokenParam);

        guildSignIn(guildId, tokenParam)
          .then(() => {})
          .catch(err => {
            console.error(err);
          });

        localFetchedRef.current = true;
        isUserFetched.current = true;
      }
    }
  }, [guildId, isUserFetched, guildSignIn, guestSignIn, setUserData, tokenParam, usernameParam]);

  return <></>;
}
