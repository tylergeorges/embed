import { useAppRouter } from '@lib/hooks';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { router } = useAppRouter();

  useEffect(() => {
    router.push('channels/299881420891881473/309009333436547082');
  }, [router]);

  return <></>;
};

export default Home;
