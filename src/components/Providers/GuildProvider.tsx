import React, { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions } from '@state';
import { useRouter } from 'next/router';
import { RouterQuery } from 'types/routerQuery';
import { Loading } from '@components/Overlays/Loading';

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
        rateLimitPerUser
      }
    }
  }
`);

export const GuildProvider = ({ children }: GuildProviderProps) => {
  const router = useRouter();
  const { guild: guildID } = router.query as RouterQuery;

  const [{ data, fetching }] = useQuery({
    query: guildDocument,
    variables: { id: guildID }
  });

  const setGuildData = useStoreActions(state => state.guild.setData);
  const setSettings = useStoreActions(state => state.guild.setSettings);
  const setChannels = useStoreActions(state => state.guild.setChannels);

  useEffect(() => {
    if (!fetching && data) {
      setGuildData(data.guild);
      // @ts-expect-error
      setSettings(data.guild.settings);
      // @ts-expect-error
      setChannels(data.guild.channels);
    }
  }, [data, fetching, setChannels, setGuildData, setSettings]);

  if (fetching && !data) return <Loading />;
  return <>{children}</>;
};
