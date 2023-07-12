import { Fragment, RefObject, forwardRef } from 'react';
import * as Styles from '@components/Sidebar/ChannelsSidebar/styles';
import { useStoreState } from '@state';
import { Category as ICategory } from '@graphql/graphql';
import { ThreadSpine } from '@components/Shared/Icons/ThreadSpine';
import { Channel } from './Channel';

interface ChannelsProps {
  currentChannelID: string;

  currentThreadID: string;

  isCategoryOpen: boolean;

  category: ICategory;

  currentChannelRef: RefObject<HTMLAnchorElement>;
}
/** Component that handles rendering text and thread channels */
export const ChannelsContainer = forwardRef<HTMLDivElement, ChannelsProps>(
  ({ currentChannelID, isCategoryOpen, category, currentChannelRef, currentThreadID }, ref) => {
    const channels = useStoreState(state => state.guild.channels!);

    return (
      <div ref={ref}>
        {channels
          .filter(c => c.category?.id === category?.id)
          .map(channel => (
            <Fragment key={channel.id}>
              <Styles.ChannelsWrapper draggable={false}>
                <Channel
                  channel={channel}
                  isActive={channel.id === currentChannelID}
                  isCategoryOpen={isCategoryOpen}
                  ref={currentChannelRef}
                  channelHasActiveThread={!!currentThreadID && channel.id === currentChannelID}
                />
              </Styles.ChannelsWrapper>

              {channel.threads?.map(thread => (
                <Fragment key={thread.id}>
                  {currentThreadID === thread.id && (
                    <Styles.ThreadsWrapper>
                      {thread.id === currentThreadID && <ThreadSpine />}
                      <Channel
                        isThread
                        channel={thread}
                        isActive={thread.id === currentThreadID}
                        isCategoryOpen={isCategoryOpen}
                        ref={currentChannelRef}
                        channelHasActiveThread={
                          !!currentThreadID && channel.id === currentChannelID
                        }
                      />
                    </Styles.ThreadsWrapper>
                  )}
                </Fragment>
              ))}
            </Fragment>
          ))}
      </div>
    );
  }
);

ChannelsContainer.displayName = 'ChannelsContainer';
