import * as Styles from '@components/Overlays/Modal/styles';
import { useTranslation } from 'react-i18next';
import { Icons } from '@icons/index';

export const NoPins = () => {
  const { t } = useTranslation();

  return (
    <Styles.NoPinnedContent>
      <Icons icon="NoPins" size="auto" color="dark" />

      <Styles.NoPinnedMessage>
        {t('nopinnedmessages.top')}
        <br />
        {t('nopinnedmessages.bottom')}
      </Styles.NoPinnedMessage>
    </Styles.NoPinnedContent>
  );
};
