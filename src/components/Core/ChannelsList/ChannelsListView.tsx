import { useRouter } from 'next/router';
import { GuildQuery } from '@/graphql/graphql';
import { SideBar } from '@/components/Core/SideBar';
import { Category } from '@/components/Core/ChannelsList/Category';

export interface ICategory {
  __typename?: 'Category' | undefined;
  id: string;
  name: string;
  position: number;
}

/** All the categories for the guild. */
export type TCategories = (ICategory | undefined | null)[];

export interface ChannelsProps {
  /** All the categories for the guild. */
  categories: TCategories;

  /** The ID of the current guild. */
  guildID: string;

  /** Guild query data. */
  guildData: GuildQuery;
}

/** This component displays the channels for the given guild, it wraps
 *  the guild header and all of the guilds channels.
 *
 * @param categories                   All the categories for the guild.
 * @param guildData                    Guild query data.
 * @param guildID                      The ID of the current guild.
 */
export const ChannelsListView = ({ categories, guildData, guildID }: ChannelsProps) => {
  const router = useRouter();

  const { channel: currentChannelID } = router.query;

  return (
    <SideBar header_name={guildData.guild.name} sidebar_color="rgb(46, 48, 54)">
      {categories.map(category => (
        <Category
          currentChannelID={currentChannelID as string}
          key={category?.id}
          category={category}
          guildData={guildData}
          guildID={guildID}
        />
      ))}
    </SideBar>
  );
};
