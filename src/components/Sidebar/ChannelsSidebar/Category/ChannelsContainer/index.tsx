import { Fragment, RefObject, forwardRef } from 'react';
import * as Styles from '@components/Sidebar/ChannelsSidebar/styles';
import { useStoreState } from '@state';
import { Category as ICategory } from '@graphql/graphql';
import { ThreadSpine } from '@components/Shared/Icons/ThreadSpine';
import { useAppRouter } from '@hooks/useAppRouter';
import { Channel } from './Channel';

interface ChannelsProps {
  isCategoryOpen: boolean;

  category: ICategory;

  currentChannelRef: RefObject<HTMLAnchorElement>;
}
/** Component that handles rendering text and thread channels */
export const ChannelsContainer = forwardRef<HTMLDivElement, ChannelsProps>(
  ({ isCategoryOpen, category, currentChannelRef }, ref) => {
    const channels = useStoreState(state => state.guild.channels!);
    const { threadId, channelId } = useAppRouter();

    return (
      <div ref={ref}>
        {channels
          .filter(c => c.category?.id === category?.id)
          .map(channel => (
            <Fragment key={channel.id}>
              <Styles.ChannelsWrapper draggable={false}>
                <Channel
                  channel={channel}
                  isActive={channel.id === channelId}
                  isCategoryOpen={isCategoryOpen}
                  ref={currentChannelRef}
                  channelHasActiveThread={!!threadId && channel.id === channelId}
                />
              </Styles.ChannelsWrapper>

              {channel.threads?.map(thread => (
                <Fragment key={thread.id}>
                  {threadId === thread.id && (
                    <Styles.ThreadsWrapper>
                      {thread.id === threadId && <ThreadSpine />}
                      <Channel
                        isThread
                        channel={thread}
                        isActive={thread.id === threadId}
                        isCategoryOpen={isCategoryOpen}
                        ref={currentChannelRef}
                        channelHasActiveThread={!!threadId && channel.id === channelId}
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
