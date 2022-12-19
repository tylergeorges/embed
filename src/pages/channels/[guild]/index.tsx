import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getEnvVar } from '../../../util/env';

const GuildIndex: NextPage = () => {
  const router = useRouter();
  const { guild } = router.query;

  const apiUrl = getEnvVar('CUSTOM_SERVER_ENDPOINT');

  return (
    <div>
      <p>Guild - {guild}</p>

      <p>apiUrl - {apiUrl}</p>
    </div>
  );
};

export default GuildIndex;
