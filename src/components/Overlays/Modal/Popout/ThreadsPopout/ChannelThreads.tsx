import * as Styles from '@components/Overlays/Modal/styles';
import { Channel } from '@graphql/graphql';
import { useTranslation } from 'react-i18next';
import { ThreadsPanelButton } from '@icons/Buttons/ThreadsPanelButton';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions } from '@state';
import { memo } from 'react';

interface ChannelThreadsProps {
  threads: Channel[];
}

const ThreadPopoutItem = ({ thread }: { thread: Channel }) => {
  const { router, channelId, guildId } = useAppRouter();

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const handleThreadClick = () => {
    setCurrentThread(thread);
    router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`, undefined, {
      shallow: true
    });
  };

  return (
    <Styles.ThreadsPopoutListItem key={thread.id} onClick={handleThreadClick}>
      <Styles.ThreadName>{thread.name}</Styles.ThreadName>

      <ThreadsPanelButton thread={thread} />
    </Styles.ThreadsPopoutListItem>
  );
};

const ChannelThreads = memo(({ threads }: ChannelThreadsProps) => {
  const translate = useTranslation();

  return (
    <Styles.ThreadsPopoutContent>
      <Styles.ThreadsPopoutListHeader>
        {translate.t('olderthreads.label')}
      </Styles.ThreadsPopoutListHeader>

      <Styles.ThreadsPopoutList>
        {' '}
        {threads.map(thread => (
          <ThreadPopoutItem thread={thread} key={thread.id} />
        ))}
      </Styles.ThreadsPopoutList>
    </Styles.ThreadsPopoutContent>
  );
});

ChannelThreads.displayName = 'ChannelThreads';
ChannelThreads.whyDidYouRender = true;

export default ChannelThreads;
