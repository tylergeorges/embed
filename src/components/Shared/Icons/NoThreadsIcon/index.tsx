import * as Styles from '@components/Overlays/Modal/styles';
import { Icons } from '@components/Shared/Icons';
import { StarsIcon } from '@icons/StarsIcon';

export const NoThreadsIcon = () => (
  <Styles.NoThreadsIconOuter>
    <Styles.NoThreadsIconInner>
      <Styles.NoThreadsHashWrapper>
        <Icons icon="ThreadHash" size="large" />
      </Styles.NoThreadsHashWrapper>
      <StarsIcon />
    </Styles.NoThreadsIconInner>
  </Styles.NoThreadsIconOuter>
);
