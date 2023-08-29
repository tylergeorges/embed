import { NoThreadsIcon } from '@icons/NoThreadsIcon';
import * as Styles from '@components/Overlays/Modal/styles';
import { useTranslation } from 'react-i18next';

export const NoThreads = () => {
  const { t } = useTranslation();

  return (
    <Styles.NoThreadsContent>
      <NoThreadsIcon />
      <Styles.NoThreadsHeader>{t('nothreads')}</Styles.NoThreadsHeader>
    </Styles.NoThreadsContent>
  );
};
