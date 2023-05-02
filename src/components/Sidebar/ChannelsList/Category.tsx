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
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  //
  const currentChannelRef = useRef<HTMLAnchorElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const guildChannels = useStoreState(state => state.guild.channels!);

  const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);
  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

  const initChannelYPos = useStoreState(state => state.ui.initChannelYPos);
  const currentChannelY = useStoreState(state => state.ui.currentChannelYPos);

  // Ref used to get the height of the container that holds the channel names
  const channelsConRef = useRef<HTMLDivElement>(null);
  const [channelsConHeight, setChannelsConHeight] = useState(0);

  useEffect(() => {
    // ! Sets the initial ActiveBackground component's position
    if (currentChannelRef.current) {
      setCurrentChannelYPos(currentChannelRef.current.offsetTop);

      setInitChannelYPos(currentChannelRef.current.offsetTop);
    }

    if (channelsConRef.current) {
      setChannelsConHeight(channelsConRef.current.offsetHeight);
    }
  }, [setCurrentChannelYPos, setInitChannelYPos]);

  const toggleIsOpen = useCallback(() => {
    // If this category has an active channel
    const isActiveCategory = !!currentChannelRef.current;

    // If category with active channel is below this one
    const activeCategoryIsBelow =
      categoryRef.current && initChannelYPos > categoryRef.current.offsetTop;

    // When we close the category
    if (isCategoryOpen) {
      const channelHeight = 29;

      if (!isActiveCategory && activeCategoryIsBelow) {
        // When closing a category that isnt the active category
        // and the active category is below this one, update the
        // channels initial Y and current Y
        setCurrentChannelYPos(currentChannelY - channelsConHeight);
        setInitChannelYPos(initChannelYPos - channelsConHeight);
      }
      // When closing an active channel
      if (isActiveCategory && categoryRef.current) {
        setCurrentChannelYPos(categoryRef.current.offsetTop + channelHeight);
      }
      setIsCategoryOpen(false);
    }
    // When we open the category
    else {
      // When opening an active category
      if (isActiveCategory) {
        setCurrentChannelYPos(initChannelYPos);
      }

      // When opening a category that isnt active and the active
      // category is below this one
      if (!isActiveCategory && activeCategoryIsBelow) {
        setInitChannelYPos(initChannelYPos + channelsConHeight);
        setCurrentChannelYPos(currentChannelY + channelsConHeight);
      }
      setIsCategoryOpen(true);
    }
  }, [
    isCategoryOpen,
    initChannelYPos,
    setCurrentChannelYPos,
    currentChannelY,
    channelsConHeight,
    setInitChannelYPos
  ]);

  return (
    <CategoryContainer className="category-container" draggable={false}>
      <CategoryNameContainer
        onClick={toggleIsOpen}
        ref={categoryRef}
        className="category-name_container non-dragable"
      >
        <CategoryNameArrow opened={isCategoryOpen} className="category-name_arrow" />
        <CategoryName draggable={false} className="category-name non-dragable">
          {category.name}
        </CategoryName>
      </CategoryNameContainer>

      <ChannelNameContainer
        draggable={false}
        className="channel-name_container"
        ref={channelsConRef}
      >
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
