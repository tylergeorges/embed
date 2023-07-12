import { useAppRouter } from '@hooks/useAppRouter';
import { useEffect } from 'react';

function Home() {
  const { router } = useAppRouter();

  useEffect(() => {
    router.push('channels/299881420891881473/309009333436547082');
  }, [router]);

  return <></>;
}
export default Home;
