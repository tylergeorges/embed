import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const GuildChannel: NextPage = () => {
  const router = useRouter();
  const { guild, channel } = router.query;

  return (
    <div>
      Channel - {guild} - {channel}
    </div>
  );
};

export default GuildChannel;
