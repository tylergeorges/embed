import { Category as ICategory, Channel, ChannelType } from '@graphql/graphql';
import { useEffect, useRef } from 'react';
import { ChannelName } from '@components/SideBar/ChannelsList/ChannelName';
import { useStoreActions, useStoreState } from '@hooks/storeHooks';
import { CategoryName, ChannelNameContainer, CategoryContainer } from './elements';

/** Sorts channels based on the channel type. */
function position(channel: Channel) {
  return channel.type === ChannelType.GuildVoice ? channel.position + 500 : channel.position;
}

interface CategoryProps {
  /** Category we are rendering channels for. */
  category: ICategory;
  /** The channel's snowflake id. */
  currentChannelID: string;
}

/** This component renders a category and its channels. */
export const Category = ({ category, currentChannelID }: CategoryProps) => {
  const initialChannelRef = useRef<HTMLAnchorElement | null>(null);
  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);
  const guildChannels = useStoreState(state => state.ui.guildChannels) as Channel[];

  useEffect(() => {
    // ! Sets the initial ActiveBackground component's position
    if (initialChannelRef.current) {
      setCurrentChannelYPos(initialChannelRef.current.offsetTop);
    }
  }, []);

  return (
    <CategoryContainer open key={category.id}>
      <CategoryName draggable={false}>{category.name}</CategoryName>

      <ChannelNameContainer draggable={false}>
        {guildChannels
          .filter(c => c.category?.id === category!.id)
          .sort((a, b) => position(a) - position(b))
          .map(channel => (
            <ChannelName
              channel={channel}
              isActive={channel.id === currentChannelID}
              key={channel.id}
            />
          ))}
      </ChannelNameContainer>
    </CategoryContainer>
  );
};
