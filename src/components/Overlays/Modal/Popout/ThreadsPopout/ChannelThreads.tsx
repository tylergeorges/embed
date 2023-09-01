import * as Styles from '@components/Overlays/Modal/styles';
import { Message, ThreadChannel } from '@graphql/graphql';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions } from '@state';

interface ThreadPopoutItemProps {
  thread: ThreadChannel;
  latestMessage: Message;
  daysSinceMessage: string;
}
const ThreadPopoutItem = ({ thread, latestMessage, daysSinceMessage }: ThreadPopoutItemProps) => {
  const { router, channelId, guildId } = useAppRouter();

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const handleThreadClick = () => {
    setCurrentThread(thread);

    // Adds element to DOM
    setCurrentThread(thread);
    setIsDomThreadsPanelOpen(true);
    setIsMembersListOpen(false);

    router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`);
  };

  return (
    <Styles.ThreadsPopoutListItem onClick={handleThreadClick}>
      <Styles.ThreadName>{thread.name}</Styles.ThreadName>

      <Styles.ThreadContentWrapper>
        <Styles.ThreadAuthorAvatar
          width={16}
          height={16}
          alt="Threads Author Avatar"
          src={latestMessage.author.avatarUrl}
        />
        <Styles.ThreadAuthor>{latestMessage.author.name}: </Styles.ThreadAuthor>
        <Styles.ThreadContent>{latestMessage.content}</Styles.ThreadContent>
        {daysSinceMessage}
      </Styles.ThreadContentWrapper>
    </Styles.ThreadsPopoutListItem>
  );
};

interface ChannelThreadsProps {
  threads: ThreadChannel[];
}

export const ChannelThreads = ({ threads }: ChannelThreadsProps) => {
  const timeToDays = (createdAt: number) => {
    const messageDate = new Date(createdAt);

    const todaysDate = new Date();

    const messageUtcDate = Date.UTC(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate()
    );

    const todayUtcDate = Date.UTC(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      todaysDate.getDate()
    );

    const daysSinceMessage = Math.ceil((todayUtcDate - messageUtcDate) / (1000 * 60 * 60 * 24));

    return ` • ${daysSinceMessage}d ago`;
  };

  return (
    <Styles.ThreadsPopoutContent>
      <Styles.ThreadsPopoutList>
        {' '}
        {threads.map(thread => {
          const latestMessage =
            thread.messageBunch.messages[thread.messageBunch.messages.length - 1];

          return (
            <ThreadPopoutItem
              thread={thread}
              key={thread.id}
              latestMessage={latestMessage}
              daysSinceMessage={timeToDays(latestMessage.createdAt)}
            />
          );
        })}
      </Styles.ThreadsPopoutList>
    </Styles.ThreadsPopoutContent>
  );
};
