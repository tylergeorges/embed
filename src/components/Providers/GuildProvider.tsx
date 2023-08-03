import { useEffect, useRef } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions, useStoreState } from '@state';
import { Loading } from '@components/Overlays/Loading';
import { useAppRouter } from '@hooks/useAppRouter';
import { fetchDiscordUser } from '@lib/api/apiRequest';
import { useAuthAPI } from '@hooks/useAuthAPI';

interface GuildProviderProps {
  children: React.ReactNode;
}

const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
    guild(id: $id) {
      id
      name
      settings {
        readonly
        guestMode
      }

      channels {
        id
        name
        type
        position

        threads {
          id
          name
        }
        category {
          id
          name
          position
        }

        ... on TextChannel {
          topic

          threads {
            id
          }
        }
        ... on AnnouncementChannel {
          topic

          threads {
            id
          }
        }
        ... on ForumChannel {
          topic
        }

        rateLimitPerUser
      }
    }
  }
`);

export default function GuildProvider({ children }: GuildProviderProps) {
  const { guildId, router, tokenParam, usernameParam } = useAppRouter();

  const [{ data, fetching }] = useQuery({
    query: guildDocument,
    variables: { id: guildId }
  });

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setChannels = useStoreActions(state => state.guild.setChannels);
  const channels = useStoreState(state => state.guild.channels);
  const setUserData = useStoreActions(state => state.user.setUserData);

  const fetchedUserDataRef = useRef(false);

  const { guestSignIn, guildSignIn } = useAuthAPI();

  useEffect(() => {
    if (!guildId) {
      // router.push('/channels/585454996800405509/585840022511550494');

      router.push(`/channels/585454996800405509/1117820894795010138`);
    }

    if (data && !fetching) {
      setGuildData(data.guild);
      // @ts-expect-error
      setSettings(data.guild.settings);
      // @ts-expect-error
      setChannels(data.guild.channels);
    }
  }, [data, fetching, setChannels, setGuildData, setSettings, guildId, router]);

  // User Data useEffect
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchDiscordUser({ userToken: token })
        .then(data => {
          if (!data) {
            setUserData(undefined);
          }

          setUserData(data);
          fetchedUserDataRef.current = true;
        })
        .catch(err => {
          console.error(err);
          setUserData(undefined);
          fetchedUserDataRef.current = true;
        });
    } else if (!token && usernameParam) {
      console.log('usernameParam ', usernameParam);

      guestSignIn(usernameParam)
        .then(() => {
          fetchedUserDataRef.current = true;
        })
        .catch(err => {
          fetchedUserDataRef.current = true;

          console.error(err);
        });
    } else if (!token && tokenParam) {
      console.log(tokenParam);

      guildSignIn(guildId, tokenParam)
        .then(() => {
          fetchedUserDataRef.current = true;
        })
        .catch(err => {
          console.error(err);
          fetchedUserDataRef.current = true;
        });
    } else if (!token && !tokenParam && !usernameParam && !fetchedUserDataRef.current) {
      fetchedUserDataRef.current = true;
    }
  }, [setUserData, usernameParam, tokenParam, guestSignIn, guildId, guildSignIn]);

  if (fetching || !data || channels === undefined || !fetchedUserDataRef.current)
    return <Loading />;

  return <>{children}</>;
}
