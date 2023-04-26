import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

 nextjs-paths
  useEffect(() => {
    router.push('channels/299881420891881473');
  }, [router]);

  router.push('channels/299881420891881473');
 nextjs-container
  return <></>;
};

export default Home;
