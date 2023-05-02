import { Category as ICategory, Channel, ChannelType } from '@graphql/graphql';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { ChannelName } from './ChannelName';
import {
  CategoryName,
  ChannelNameContainer,
  CategoryContainer,
  CategoryNameContainer,
  CategoryNameArrow
} from './elements';

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
  //
  const currentChannelRef = useRef<HTMLAnchorElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const guildChannels = useStoreState(state => state.guild.channels!);

  const initChannelYPos = useStoreState(state => state.ui.initChannelYPos);
  const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);

  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

  useEffect(() => {
    // ! Sets the initial ActiveBackground component's position

    if (currentChannelRef.current) {
      setCurrentChannelYPos(currentChannelRef.current.offsetTop);

      setInitChannelYPos(currentChannelRef.current.offsetTop);
    }
  }, [setCurrentChannelYPos, setInitChannelYPos]);

  const toggleIsOpen = useCallback(() => {
    if (isCategoryOpen && categoryRef.current) {
      const channelHeight = 29;
      setIsCategoryOpen(false);
      setCurrentChannelYPos(categoryRef.current.offsetTop + channelHeight);
    } else {
      // Used for when we re-open the list
      setCurrentChannelYPos(initChannelYPos);
      setIsCategoryOpen(true);
    }
  }, [isCategoryOpen, initChannelYPos, setCurrentChannelYPos]);

  return (
    <CategoryContainer className="category-container">
      <CategoryNameContainer
        onClick={toggleIsOpen}
        ref={categoryRef}
        className="category-name_container"
      >
        <CategoryNameArrow opened={isCategoryOpen} className="category-name_arrow" />
        <CategoryName draggable={false} className="category-name">
          {category.name}
        </CategoryName>
      </CategoryNameContainer>

      <ChannelNameContainer draggable={false} className="channel-name_container">
        {guildChannels
          .filter(c => c.category?.id === category!.id)
          .sort((a, b) => position(a) - position(b))
          .map(channel => (
            <Fragment key={channel.id}>
              <ChannelName
                channel={channel}
                isActive={channel.id === currentChannelID}
                isCategoryOpen={isCategoryOpen}
                ref={currentChannelRef}
              />
            </Fragment>
          ))}
      </ChannelNameContainer>
    </CategoryContainer>
  );
};
