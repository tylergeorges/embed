import * as Styles from '@components/Overlays/Modal/styles';
import { useTranslation } from 'react-i18next';
import { Icons } from '@icons/index';

export const NoPins = () => {
  const translate = useTranslation();
  return (
    <Styles.NoPinnedContent>
      <Icons icon="NoPins" size="auto" color="dark" />

      <Styles.NoPinnedMessage>
        {translate.t('nopinnedmessages.top')}
        <br />
        {translate.t('nopinnedmessages.bottom')}
      </Styles.NoPinnedMessage>
    </Styles.NoPinnedContent>
  );
};
