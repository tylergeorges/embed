import { NoThreadsIcon } from '@icons/NoThreadsIcon';
import * as Styles from '@components/Overlays/Modal/styles';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

const NoThreads = memo(() => {
  const translate = useTranslation();

  return (
    <Styles.NoThreadsContent key="popout-nothreads">
      <NoThreadsIcon />
      <Styles.NoThreadsHeader>{translate.t('nothreads')}</Styles.NoThreadsHeader>
    </Styles.NoThreadsContent>
  );
});

NoThreads.displayName = 'NoThreads';
NoThreads.whyDidYouRender = true;

export default NoThreads;
