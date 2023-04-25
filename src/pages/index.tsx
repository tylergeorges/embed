import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  router.push('channels/299881420891881473');
  return <></>;
};

export default Home;
