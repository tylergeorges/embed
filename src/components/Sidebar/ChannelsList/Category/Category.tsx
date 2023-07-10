import { Category as ICategory } from '@graphql/graphql';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '@state';
import { ChannelsContainer } from '@components/Sidebar/ChannelsList/Category/ChannelsContainer/ChannelsContainer';
import { useAppRouter } from '@lib/hooks';
import * as Styles from '../styles';
import { CategoryName } from './CategoryName';

interface CategoryProps {
  /** Category we are rendering channels for. */
  category: ICategory;
}

/** This component renders a category and it's channels. */
export const Category = ({ category }: CategoryProps) => {
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
  const { threadId, channelId } = useAppRouter();

  useEffect(() => {
    // ! Sets the initial ActiveBackground component's position
    if (currentChannelRef.current) {
      setCurrentChannelYPos(currentChannelRef.current.offsetTop);
      setInitChannelYPos(currentChannelRef.current.offsetTop);
    }

    if (channelsConRef.current) {
      setChannelsConHeight(channelsConRef.current.offsetHeight);
    }
  }, [
    channelId,
    threadId,
    setCurrentChannelYPos,
    setInitChannelYPos,
    setIsThreadsPanelOpen,
    setIsCurrentChannelThread
  ]);

  const toggleIsOpen = useCallback(() => {
    const currentChannel = currentChannelRef.current;
    const categoryElement = categoryRef.current;

    if (currentChannel) {
      const isActiveCategory = !!currentChannel;
      // If category with active channel is below this one
      const activeCategoryIsBelow = currentChannel && initChannelYPos > currentChannel.offsetTop;

      // When we close the category
      if (isCategoryOpen) {
        // Font height
        const channelHeight = 22;

        if (!isActiveCategory && activeCategoryIsBelow) {
          setCurrentChannelYPos(currentChannelY - channelsConHeight);
          setInitChannelYPos(initChannelYPos - channelsConHeight);
        }

        // When closing an active channel
        if (isActiveCategory && categoryElement) {
          const isCurrentChannelThread = !!threadId;

          if (isCurrentChannelThread) {
            // For threads
            // threadHeight = Channel Height * 2 - 10
            const threadHeight = 54;
            setCurrentChannelYPos(categoryElement.offsetTop + threadHeight);
          } else {
            setCurrentChannelYPos(categoryElement.offsetTop + channelHeight);
          }
        }
        setIsCategoryOpen(false);
      }

      // When we re-open the category
      else {
        if (isActiveCategory) {
          setCurrentChannelYPos(initChannelYPos);
        } else if (!isActiveCategory && activeCategoryIsBelow) {
          setInitChannelYPos(initChannelYPos + channelsConHeight);

          setCurrentChannelYPos(currentChannelY + channelsConHeight);
        }

        setIsCategoryOpen(true);
      }
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
        currentChannelID={channelId}
        isCategoryOpen={isCategoryOpen}
        category={category}
        currentThreadID={threadId ?? ''}
        currentChannelRef={currentChannelRef}
      />
    </Styles.CategoryContainer>
  );
};
