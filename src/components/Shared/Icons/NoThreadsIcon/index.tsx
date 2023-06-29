import {
  NoThreadsIconInner,
  NoThreadsIconOuter,
  NoThreadsStars
} from '@components/Overlays/Modal/styles';
import { Icons } from '@components/Shared/Icons/Icons';

export const NoThreadsIcon = () => (
  <NoThreadsIconOuter className="popout-no_threads_outer">
    <NoThreadsIconInner className="popout-no_threads_inner">
      <Icons name="ThreadHash" size="large" css={{ textAlign: 'center' }} />
      <NoThreadsStars
        className="popout-no_threads_stars"
        aria-hidden="true"
        role="img"
        width="104"
        height="80"
        viewBox="0 0 104 80"
        fill="none"
      >
        <Icons name="Stars" />
      </NoThreadsStars>
    </NoThreadsIconInner>
  </NoThreadsIconOuter>
);
