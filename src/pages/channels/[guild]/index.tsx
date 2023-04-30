import { getEnvVar } from '@util/env';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  return {
    props: {} // will be passed to the page component as props
  };
}

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
