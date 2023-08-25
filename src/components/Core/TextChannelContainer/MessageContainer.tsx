import { TextBox } from '@components/Core/TextChannelContainer/TextBox';
import { useStoreState } from '@state';
import { MessageListRenderer } from '@components/Core/VirtualLists/MessageListRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const canSend = useStoreState(state => state.guild.currentChannel)?.canSend;
  const user = useStoreState(state => state.user.data);

  const { channelId: channel, guildId: guild, threadId: thread } = useAppRouter();

  const threadId = channelIsThread ? thread : undefined;

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex, updateQuery } = useMessages({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined
  });

  useMessageSubscription({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined,
    updateQuery
  });

  return (
    <Styles.MessageWrapper
      draggable={false}
      membersListOpen={isMembersListOpen}
      mobile={{
        '@initial': false,
        '@small': true
      }}
    >
      <MessageListRenderer
        startReached={loadMoreMessages}
        messages={groupedMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
      />

      <TextBox channelIsThread={channelIsThread} canSend={!!canSend && !!user} isAuthed={!!user} />
    </Styles.MessageWrapper>
  );
};
