import * as Styles from '@components/Overlays/Modal/styles';
import { Icons } from '@components/Shared/Icons/Icons';

export const NoThreadsIcon = () => (
  <Styles.NoThreadsIconOuter>
    <Styles.NoThreadsIconInner>
      <Icons name="ThreadHash" size="large" />
      <Icons name="Stars" />
    </Styles.NoThreadsIconInner>
  </Styles.NoThreadsIconOuter>
);
