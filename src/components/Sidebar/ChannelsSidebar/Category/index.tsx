import { Category as ICategory } from '@graphql/graphql';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { ChannelsContainer } from '@components/Sidebar/ChannelsSidebar/Category/ChannelsContainer';
import { useRouter } from 'next/router';
import * as Styles from '../styles';
import CategoryName from './CategoryName';

interface CategoryProps {
  category: ICategory;
}

const Category = memo(({ category }: CategoryProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [channelsConHeight, setChannelsConHeight] = useState(0);

  // Refs
  const currentChannelRef = useRef<HTMLAnchorElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  // Ref used to get the height of the container that holds the channel names
  const channelsConRef = useRef<HTMLDivElement>(null);

  // Actions
  const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);
  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

  // const isCurrentChannelThread = useStoreActions(state => state.ui.setIsCurrentChannelThread);

  const { threadId } = useRef(useRouter().query).current;

  // State
  const initChannelYPos = useStoreState(state => state.ui.initChannelYPos);
  const currentChannelY = useStoreState(state => state.ui.currentChannelYPos);

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
    const isActiveCategory = !!currentChannelRef.current;

    // If category with active channel is below this one
    const activeCategoryIsBelow =
      categoryRef.current && initChannelYPos > categoryRef.current.offsetTop;

    // When we close the category
    if (isCategoryOpen) {
      // Channel name font height
      const channelHeight = 21;

      if (!isActiveCategory && activeCategoryIsBelow) {
        setCurrentChannelYPos(currentChannelY - channelsConHeight);
        setInitChannelYPos(initChannelYPos - channelsConHeight);
      }

      // When closing an active channel
      if (isActiveCategory && categoryRef.current) {
        if (threadId) {
          // For threads
          // threadHeight = Channel Height * 2 - 10
          const threadHeight = 54;
          setCurrentChannelYPos(categoryRef.current.offsetTop + threadHeight);
        } else {
          setCurrentChannelYPos(categoryRef.current.offsetTop + channelHeight);
        }
      }
      setIsCategoryOpen(false);

      // When we re-open the category
    } else {
      if (isActiveCategory && categoryRef.current) {
        setCurrentChannelYPos(initChannelYPos);
      } else if (!isActiveCategory && activeCategoryIsBelow && categoryRef.current) {
        setInitChannelYPos(initChannelYPos + channelsConHeight);

        setCurrentChannelYPos(currentChannelY + channelsConHeight);
      }

      setIsCategoryOpen(true);
    }
  }, [
    isCategoryOpen,
    initChannelYPos,
    currentChannelY,
    threadId,
    channelsConHeight,
    setCurrentChannelYPos,
    setInitChannelYPos
  ]);

  return (
    <Styles.CategoryContainer draggable={false}>
      <CategoryName
        category={category}
        isCategoryOpen={isCategoryOpen}
        toggleIsOpen={toggleIsOpen}
        ref={categoryRef}
      />

      <ChannelsContainer
        ref={channelsConRef}
        isCategoryOpen={isCategoryOpen}
        category={category}
        currentChannelRef={currentChannelRef}
      />
    </Styles.CategoryContainer>
  );
});

Category.displayName = 'Category';
Category.whyDidYouRender = true;

export default Category;
