import { useAppRouter } from '@hooks/useAppRouter';
import React, { useEffect } from 'react';

export default function Home() {
  const { router } = useAppRouter();

  useEffect(() => {
    router.push('channels/299881420891881473/309009333436547082');
  }, [router]);

  return <></>;
}
