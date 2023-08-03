import React, { useEffect, useRef } from 'react';
import { useStoreActions } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { fetchDiscordUser } from '@lib/api/apiRequest';
import { useAuthAPI } from '@hooks/useAuthAPI';

interface UserProviderProps {
  setIsUserFetched: () => void;
}

export default function UserProvider({ setIsUserFetched }: UserProviderProps) {
  const { guildId, tokenParam, usernameParam } = useAppRouter();
  const localFetchedRef = useRef(false);

  const setUserData = useStoreActions(state => state.user.setUserData);

  const { guestSignIn, guildSignIn } = useAuthAPI();

  useEffect(() => {
    // console.log('token is set', usernameParam);
    if (!localFetchedRef.current) {
      console.log('FETCHING USER DATA', localFetchedRef.current);

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
        setIsUserFetched();
      } else if (!token && usernameParam) {
        console.log('usernameParam ', usernameParam);

        guestSignIn(usernameParam)
          .then(() => {})
          .catch(err => {
            console.error(err);
          });

        localFetchedRef.current = true;
        setIsUserFetched();
      } else if (!token && tokenParam) {
        console.log(tokenParam);

        guildSignIn(guildId, tokenParam)
          .then(() => {})
          .catch(err => {
            console.error(err);
          });

        localFetchedRef.current = true;
        setIsUserFetched();
      } else if (!token && !tokenParam && !usernameParam) {
        localFetchedRef.current = true;
        setIsUserFetched();
      }
    }
  }, [guildId, setIsUserFetched, guildSignIn, guestSignIn, setUserData, tokenParam, usernameParam]);

  return <></>;
}
