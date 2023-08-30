import { Category as ICategory } from '@graphql/graphql';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import { ChannelsContainer } from '@components/Sidebar/ChannelsSidebar/Category/ChannelsContainer';
import * as Styles from '../styles';
import { CategoryName } from './CategoryName';

interface CategoryProps {
  category: ICategory;
}

export const Category = ({ category }: CategoryProps) => {
  const { threadId, channelId } = useAppRouter();

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [channelsConHeight, setChannelsConHeight] = useState(0);

  // Refs
  const currentChannelRef = useRef<HTMLAnchorElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  // Ref used to get the height of the container that holds the channel names
  const channelsConRef = useRef<HTMLDivElement>(null);
  const shouldRefetch = useStoreState(state => state.guild.refetchGuild);

  // Actions
  const setInitChannelYPos = useStoreActions(state => state.ui.setInitChannelYPos);
  const setCurrentChannelYPos = useStoreActions(state => state.ui.setCurrentChannelYPos);

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const setIsTransitionedThreadsPanelOpen = useStoreActions(
    state => state.ui.setIsTransitionedThreadsPanelOpen
  );

  // State
  const initChannelYPos = useStoreState(state => state.ui.initChannelYPos);
  const currentChannelY = useStoreState(state => state.ui.currentChannelYPos);

  useEffect(() => {
    // ! Sets the initial ActiveBackground component's position

    if (!threadId) {
      setIsTransitionedThreadsPanelOpen(false);
      setIsDomThreadsPanelOpen(false);
    }

    if (currentChannelRef.current && !shouldRefetch) {
      setCurrentChannelYPos(currentChannelRef.current.offsetTop);
      setInitChannelYPos(currentChannelRef.current.offsetTop);
    }

    if (currentChannelRef.current && shouldRefetch) {
      setCurrentChannelYPos(currentChannelRef.current.offsetTop);
      setInitChannelYPos(currentChannelRef.current.offsetTop);
    }

    if (channelsConRef.current && channelsConRef.current.offsetHeight !== 0) {
      setChannelsConHeight(channelsConRef.current.offsetHeight);
    }
  }, [
    channelId,
    threadId,
    setCurrentChannelYPos,
    setInitChannelYPos,
    setIsDomThreadsPanelOpen,
    setIsTransitionedThreadsPanelOpen,
    shouldRefetch
  ]);

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
        const isCurrentChannelThread = !!threadId;

        if (isCurrentChannelThread) {
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
        // console.log(' isActiveCategory && categoryRef.current ', initChannelYPos);
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
    setCurrentChannelYPos,
    currentChannelY,
    channelsConHeight,
    setInitChannelYPos,
    threadId
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
};
