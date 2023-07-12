/* eslint-disable no-plusplus */
import * as Styles from '@components/Shared/SkeletonLoaders';

// TODO: finish implementing skeleton loader
export const MessageSkeleton = () => (
  <Styles.MessageSkeletonWrapper>
    <Styles.MessageSkeletonAvatar />
    <Styles.MessageSkeletonContent>
      <Styles.MessageSkeletonUsername />
    </Styles.MessageSkeletonContent>
  </Styles.MessageSkeletonWrapper>
);
