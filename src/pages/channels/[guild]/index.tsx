import { getEnvVar } from '@util/env';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const GuildIndex: NextPage = () => {
  const router = useRouter();
  const { guild } = router.query;

  const apiUrl = getEnvVar('CUSTOM_SERVER_ENDPOINT');

  if (apiUrl) {
    return (
      <div>
        <p>Guild - {guild}</p>

        <p>apiUrl - {apiUrl}</p>
      </div>
    );
  }
  return <div>ERROR - api url returned undefined</div>;
};

export default GuildIndex;
