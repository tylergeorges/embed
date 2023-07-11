import * as Styles from '@components/Overlays/Modal/styles';
import { Icons } from '@components/Shared/Icons';

export const NoThreadsIcon = () => (
  <Styles.NoThreadsIconOuter>
    <Styles.NoThreadsIconInner>
      <Styles.NoThreadsHashWrapper>
        <Icons name="ThreadHash" size="large" customViewbox="0 0 24 24" />
      </Styles.NoThreadsHashWrapper>
      <Icons
        name="Stars"
        customViewbox="0 0 104 80"
        css={{ position: 'absolute', width: 104, height: 80, left: -5 }}
      />
    </Styles.NoThreadsIconInner>
  </Styles.NoThreadsIconOuter>
);
