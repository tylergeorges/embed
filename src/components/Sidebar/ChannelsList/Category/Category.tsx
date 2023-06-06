import { Category as ICategory } from '@graphql/graphql';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { ChannelsContainer } from '@components/Sidebar/ChannelsList/Category/ChannelsContainer/ChannelsContainer';
import { CategoryName } from './CategoryName';
import { CategoryContainer } from '../elements';

interface CategoryProps {
  /** Category we are rendering channels for. */
  category: ICategory;
  /** The channel's snowflake id. */
  currentChannelID: string;
  /** The current threads id */
  currentThreadID?: string;
}

/** This component renders a category and its channels. */
export const Category = ({ category, currentChannelID, currentThreadID }: CategoryProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  // Refs
  const currentChannelRef = useRef<HTMLAnchorElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);
  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

  const setIsCurrentChannelThread = useStoreActions(state => state.ui.setIsCurrentChannelThread);
  const setIsThreadsPanelOpen = useStoreActions(state => state.ui.setIsThreadsPanelOpen);
  const initChannelYPos = useStoreState(state => state.ui.initChannelYPos);
  const currentChannelY = useStoreState(state => state.ui.currentChannelYPos);

  // Ref used to get the height of the container that holds the channel names
  const channelsConRef = useRef<HTMLDivElement>(null);
  const [channelsConHeight, setChannelsConHeight] = useState(0);

  useEffect(() => {
    const currentChannelIsThread = !!currentThreadID;

    setIsCurrentChannelThread(currentChannelIsThread);
    setIsThreadsPanelOpen(currentChannelIsThread);

    // ! Sets the initial ActiveBackground component's position
    if (currentChannelRef.current) {
      setCurrentChannelYPos(currentChannelRef.current.offsetTop);

      setInitChannelYPos(currentChannelRef.current.offsetTop);
    }

    if (channelsConRef.current) {
      setChannelsConHeight(channelsConRef.current.offsetHeight);
    }
  }, [
    setCurrentChannelYPos,
    setInitChannelYPos,
    currentThreadID,
    setIsThreadsPanelOpen,
    setIsCurrentChannelThread
  ]);

  const toggleIsOpen = useCallback(() => {
    // If this category has an active channel
    const isActiveCategory = !!currentChannelRef.current;

    // If category with active channel is below this one
    const activeCategoryIsBelow =
      categoryRef.current && initChannelYPos > categoryRef.current.offsetTop;

    // When we close the category
    if (isCategoryOpen) {
      const channelHeight = 25;
      // const channelHeight = 23;

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
      <CategoryName
        category={category}
        isCategoryOpen={isCategoryOpen}
        toggleIsOpen={toggleIsOpen}
        ref={categoryRef}
      />

      <ChannelsContainer
        ref={channelsConRef}
        currentChannelID={currentChannelID}
        isCategoryOpen={isCategoryOpen}
        category={category}
        currentThreadID={currentThreadID ?? ''}
        currentChannelRef={currentChannelRef}
      />
    </CategoryContainer>
  );
};
