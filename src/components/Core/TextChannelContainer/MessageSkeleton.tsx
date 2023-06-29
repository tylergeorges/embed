/* eslint-disable no-plusplus */
import * as Styles from '@components/Core/TextChannelContainer/styles';

const FirstSkeletonLine = () => (
  <Styles.MessageSkeletonContentLine>
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentShortWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
  </Styles.MessageSkeletonContentLine>
);

const SecondSkeletonLine = () => (
  <Styles.MessageSkeletonContentLine>
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
  </Styles.MessageSkeletonContentLine>
);

const LastSkeletonLine = () => (
  <Styles.MessageSkeletonContentLine>
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentShortWord />
    <Styles.MessageSkeletonContentLongWord />
  </Styles.MessageSkeletonContentLine>
);

export const MessageSkeleton = () => (
  <Styles.MessageSkeletonWrapper>
    <Styles.MessageSkeletonAvatar />
    <Styles.MessageSkeletonContent>
      <Styles.MessageSkeletonUsername />
      <FirstSkeletonLine />
      <SecondSkeletonLine />
      <LastSkeletonLine />
    </Styles.MessageSkeletonContent>
  </Styles.MessageSkeletonWrapper>
);
