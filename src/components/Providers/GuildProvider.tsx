import React, { useEffect } from 'react';
import { graphql } from '@graphql/gql';
import { useQuery } from 'urql';
import { useStoreActions } from '@state';
import { useRouter } from 'next/router';
import { RouterQuery } from 'types/routerQuery';

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
      setSettings(data.guild.settings);
      setChannels(data.guild.channels);
    }

  }, [data, fetching]);

  if (!data || fetching) {
    return <>loading...</>;
  }

  return <>{children}</>;
}
