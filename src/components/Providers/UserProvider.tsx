import { useEffect, useRef } from 'react';
import { useStoreActions } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { fetchLatestProfile } from '@lib/api/apiRequest';
import { useAuthApi } from '@hooks/useAuthApi';

interface UserProviderProps {
  setIsUserFetched: () => void;
}

export default function UserProvider({ setIsUserFetched }: UserProviderProps) {
  const { guildId, tokenParam, usernameParam } = useAppRouter();
  const localFetchedRef = useRef(false);

  const setUserData = useStoreActions(state => state.user.setUserData);

  const { guestSignIn, guildSignIn } = useAuthApi();

  useEffect(() => {
    // Check if guildId is in URL to make sure pages loaded
    if (!localFetchedRef.current && guildId) {
      const token = localStorage.getItem('token');

      if (token) {
        fetchLatestProfile({ userToken: token })
          .then(user => {
            if (!user) {
              setUserData(undefined);
            } else {
              setUserData(user);
            }
          })
          .catch(err => {
            console.error(err);
            setUserData(undefined);
          });

        localFetchedRef.current = true;
        setIsUserFetched();
      } else if (!token && usernameParam) {
        guestSignIn(usernameParam)
          .then(() => {})
          .catch(err => {
            console.error(err);
          });

        localFetchedRef.current = true;
        setIsUserFetched();
      } else if (!token && tokenParam) {
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
