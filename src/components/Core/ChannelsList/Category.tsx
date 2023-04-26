import {
  CategoryName,
  ChannelName,
  ChannelNameActiveInner,
  ChannelNameContainer,
  ChannelNameInner
} from '@components/Core';
import { Hash } from '@components/Shared/Channel/elements';
import { Channel, ChannelType, GuildQuery } from '@graphql/graphql';

export interface ICategory {
  __typename?: 'Category' | undefined;
  id: string;
  name: string;
  position: number;
}

interface CategoryProps {
  /** Category we are rendering channels for. */
  category: ICategory | null | undefined;

  /** The ID of the current guild. */
  guildID: string;

  /** Guild query data. */
  guildData: GuildQuery;

  /** The channel's snowflake id. */
  currentChannelID: string;
}

const position = (channel: Channel) =>
  channel.type === ChannelType.GuildVoice ? channel.position + 500 : channel.position;

interface ChannelNameProps {
  channel_name: string;
}

const InactiveChannelName = ({ channel_name }: ChannelNameProps) => (
  <ChannelNameInner
    draggable={false}
    style={{
      marginBottom: 2,
      marginLeft: 8,
      marginRight: 8,
      marginTop: 2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}
  >
    <Hash />
    {channel_name}
  </ChannelNameInner>
);

const ActiveChannelName = ({ channel_name }: ChannelNameProps) => (
  <ChannelNameActiveInner
    draggable={false}
    style={{
      marginBottom: 2,
      marginLeft: 8,
      marginRight: 8,
      marginTop: 2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}
  >
    <Hash />
    {channel_name}
  </ChannelNameActiveInner>
);

/** This component renders a category and its channels. */
export const Category = ({ category, guildData, guildID, currentChannelID }: CategoryProps) => (
  <details
    open
    key={category!.id}
    style={{
      width: '100%',
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: 500,
      paddingTop: 20,
      marginLeft: 8,
      marginRight: 8
    }}
  >
    <CategoryName draggable={false}>{category!.name}</CategoryName>

    <ChannelNameContainer draggable={false}>
      {guildData.guild.channels
        .filter(c => c.category?.id === category!.id)
        .sort((a, b) => position(a) - position(b))
        .map(channel => (
          <ChannelName
            key={channel.id}
            href={`/channels/${guildID}/${channel.id}`}
            draggable={false}
          >
            {currentChannelID === channel.id ? (
              <ActiveChannelName channel_name={channel.name} />
            ) : (
              <InactiveChannelName channel_name={channel.name} />
            )}
          </ChannelName>
        ))}
    </ChannelNameContainer>
  </details>
);
