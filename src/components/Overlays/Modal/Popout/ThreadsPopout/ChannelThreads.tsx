import * as Styles from '@components/Overlays/Modal/styles';
import { useTranslation } from 'react-i18next';
import { ThreadsPanelButton } from '@icons/Buttons/ThreadsPanelButton';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions } from '@state';
import { ThreadChannel } from '@graphql/graphql';

interface ChannelThreadsProps {
  threads: ThreadChannel[];
}

const ThreadPopoutItem = ({ thread }: { thread: ThreadChannel }) => {
  const { router, channelId, guildId } = useAppRouter();

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const handleThreadClick = () => {
    setCurrentThread(thread);

    router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`);
  };

  return (
    <Styles.ThreadsPopoutListItem key={thread.id} onClick={handleThreadClick}>
      <Styles.ThreadName>{thread.name}</Styles.ThreadName>

      <ThreadsPanelButton thread={thread} />
    </Styles.ThreadsPopoutListItem>
  );
};

export const ChannelThreads = ({ threads }: ChannelThreadsProps) => {
  const { t } = useTranslation();

  return (
    <Styles.ThreadsPopoutContent>
      <Styles.ThreadsPopoutListHeader>{t('olderthreads.label')}</Styles.ThreadsPopoutListHeader>

      <Styles.ThreadsPopoutList>
        {' '}
        {threads.map(thread => (
          <ThreadPopoutItem thread={thread} key={thread.id} />
        ))}
      </Styles.ThreadsPopoutList>
    </Styles.ThreadsPopoutContent>
  );
};
