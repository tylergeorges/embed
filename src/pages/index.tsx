import { useAppRouter } from '@hooks/useAppRouter';
import React, { useEffect } from 'react';

export default function Home() {
  const { router } = useAppRouter();

  useEffect(() => {
    router.push('channels/299881420891881473/368427726358446110');
  }, [router]);

  return <></>;
}
