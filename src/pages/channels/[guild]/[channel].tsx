import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'urql';
import { useMemo } from 'react';
import { graphql } from '@/graphql';
import { Channel, ChannelType } from '@/graphql/graphql';

const guildDocument = graphql(/* GraphQL */ `
  query Guild($id: String!) {
    guild(id: $id) {
      name
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const channelDocument = graphql(/* GraphQL */ `
  query Channel($channelId: String!, $guildId: String!) {
    channelV2(id: $channelId, guild: $guildId) {
      id
    }
  }
`);

const position = (channel: Channel) =>
  channel.type === ChannelType.GuildVoice ? channel.position + 500 : channel.position;

const GuildChannel: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { guild: guildID, channel: channelID } = router.query;
  const [{ data }] = useQuery({ query: guildDocument, variables: { id: guildID as string } });

  const currentChannel = useMemo(
    () => data?.guild.channels.find(c => c.id === channelID),
    [channelID, data]
  );

  const categories = useMemo(
    () =>
      [...new Map(data?.guild.channels.map(c => [c.category?.id, c.category])).values()].filter(
        c => c
      ),
    [data]
  );

  if (!data) return <div>loading...</div>;

  const { guild } = data;

  console.log(guild);

  return (
    <div>
      Channel - {guildID} - {channelID}
      <p>Guild: {guild.name}</p>
      <p>Channel: #{currentChannel?.name}</p>
      <div>
        {guild.channels
          .filter(c => !c.category)
          .sort((a, b) => position(a) - position(b))
          .map(channel => (
            <a key={channel.id} href={`/channels/${guildID}/${channel.id}`}>
              #{channel.name}
            </a>
          ))}
      </div>
      {categories.map(category => (
        <details open key={category!.id} style={{ marginTop: '10px' }}>
          <summary>{category!.name}</summary>
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
            {guild.channels
              .filter(c => c.category?.id === category!.id)
              .sort((a, b) => position(a) - position(b))
              .map(channel => (
                <a key={channel.id} href={`/channels/${guildID}/${channel.id}`}>
                  #{channel.name}
                </a>
              ))}
          </div>
        </details>
      ))}
      <p>{t('input.message', { CHANNEL: currentChannel?.name })}</p>
    </div>
  );
};

export default GuildChannel;
