import { NoThreadsIcon } from '@icons/NoThreadsIcon';
import * as Styles from '@components/Overlays/Modal/styles';
import { useTranslation } from 'react-i18next';

export const NoThreads = () => {
  const translate = useTranslation();

  return (
    <Styles.NoThreadsContent>
      <NoThreadsIcon />
      <Styles.NoThreadsHeader>{translate.t('nothreads')}</Styles.NoThreadsHeader>
    </Styles.NoThreadsContent>
  );
};
