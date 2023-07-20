import * as Styles from '@components/Overlays/Modal/styles';
import { Channel } from '@graphql/graphql';
import { ThreadsPanelButton } from '@icons/Buttons/ThreadsPanelButton';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions } from '@state';

interface ThreadPopoutItemProps {
  thread: Channel;

  currentUrl: string;
}
export const ThreadPopoutItem = ({ thread, currentUrl }: ThreadPopoutItemProps) => {
  const { router } = useAppRouter();

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const handleThreadClick = () => {
    setCurrentThread(thread);
    router.push(`${currentUrl}?thread=${thread.id}`);
  };

  return (
    <Styles.ThreadsPopoutListItem key={thread.id} onClick={handleThreadClick}>
      <Styles.ThreadName>{thread.name}</Styles.ThreadName>

      <ThreadsPanelButton thread={thread} />
    </Styles.ThreadsPopoutListItem>
  );
};
