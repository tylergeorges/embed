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
