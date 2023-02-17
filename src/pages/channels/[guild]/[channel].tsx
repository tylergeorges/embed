import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'urql';
import { graphql } from '../../../graphql';
import { Channel, ChannelType } from '../../../graphql/graphql';
import { ChannelLink, Test } from '../../../components/test/elements';

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

const position = (channel: Channel) =>
  channel.type === ChannelType.GuildVoice ? channel.position + 500 : channel.position;

const GuildChannel: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { guild: guildID, channel: channelID } = router.query;
  const [{ data }] = useQuery({ query: guildDocument, variables: { id: guildID as string } });

  if (!data) return <div>loading...</div>;

  const { guild } = data;

  console.log(guild);

  const categories = [
    ...new Map(guild.channels.map(c => [c.category?.id, c.category])).values()
  ].filter(c => c);

  return (
    <div>
      Channel - {guildID} - {channelID}
      <p>Guild: {guild.name}</p>
      <p>Channel: #{guild.channels.find(c => c.id === channelID)?.name}</p>
      <Test>hi</Test>
      <div>
        {guild.channels
          .filter(c => !c.category)
          .sort((a, b) => position(a) - position(b))
          .map(channel => (
            <ChannelLink key={channel.id} href={`/channels/${guildID}/${channel.id}`}>
              #{channel.name}
            </ChannelLink>
          ))}
      </div>
      {categories.map(category => (
        <details open key={category!.id} style={{ marginTop: '10px' }}>
          <summary>{category!.name}</summary>
          <div style={{ marginLeft: '10px' }}>
            {guild.channels
              .filter(c => c.category?.id === category!.id)
              .sort((a, b) => position(a) - position(b))
              .map(channel => (
                <ChannelLink key={channel.id} href={`/channels/${guildID}/${channel.id}`}>
                  #{channel.name}
                </ChannelLink>
              ))}
          </div>
        </details>
      ))}
      <p>{t('input.message', { CHANNEL: 'pog' })}</p>
    </div>
  );
};

export default GuildChannel;
