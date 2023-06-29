import * as Styles from '@components/Overlays/Modal/styles';
import { Icons } from '@components/Shared/Icons/Icons';

export const NoThreadsIcon = () => (
  <Styles.NoThreadsIconOuter className="popout-no_threads_outer">
    <Styles.NoThreadsIconInner className="popout-no_threads_inner">
      <Icons name="ThreadHash" size="large" />
      <Icons name="Stars" />
    </Styles.NoThreadsIconInner>
  </Styles.NoThreadsIconOuter>
);
