import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const GuildIndex: NextPage = () => {
  const router = useRouter();
  const { guild } = router.query;

  return <div>Guild - {guild}</div>;
};

export default GuildIndex;
