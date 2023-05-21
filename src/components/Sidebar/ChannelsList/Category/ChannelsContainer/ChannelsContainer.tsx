import { Fragment, RefObject, forwardRef } from 'react';
import { ChannelsWrapper, ThreadsWrapper } from '@components/Sidebar/ChannelsList/elements';
import { positionChannel } from '@util/positionChannel';
import { useStoreState } from '@state';
import { Category as ICategory } from '@graphql/graphql';
import { Spine } from '@components/Shared/Icons/Spine';
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
    const guildChannels = useStoreState(state => state.guild.channels!);

    return (
      <>
        {guildChannels
          .filter(c => c.category?.id === category?.id)
          .sort((a, b) => positionChannel(a) - positionChannel(b))
          .map(channel => (
            <Fragment key={channel.id}>
              <ChannelsWrapper draggable={false} className="channels-wrapper" ref={ref}>
                <Channel
                  channel={channel}
                  isActive={!currentThreadID && channel.id === currentChannelID}
                  isCategoryOpen={isCategoryOpen}
                  ref={currentChannelRef}
                />
              </ChannelsWrapper>

              {channel.threads?.map(thread => (
                <Fragment key={thread.id}>
                  {currentThreadID === thread.id && (
                    <ThreadsWrapper>
                      <Spine />
                      <Channel
                        isThread
                        channel={thread}
                        isActive={thread.id === currentThreadID}
                        isCategoryOpen={isCategoryOpen}
                        ref={currentChannelRef}
                      />
                    </ThreadsWrapper>
                  )}
                </Fragment>
              ))}
            </Fragment>
          ))}
      </>
    );
  }
);

ChannelsContainer.displayName = 'ChannelsContainer';
