import { useRouter } from 'next/router';
import { RouterQuery } from 'types/routerQuery';

export const useAppRouter = () => {
  const router = useRouter();

  const { channel: channelId, guild: guildId, thread: threadId } = router.query as RouterQuery;

  return { channelId, guildId, threadId, router };
};
