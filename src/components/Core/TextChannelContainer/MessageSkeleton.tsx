/* eslint-disable no-plusplus */
import * as Styles from '@components/Core/TextChannelContainer/styles';

const FirstSkeletonLine = () => (
  <Styles.MessageSkeletonContentLine className="message-skeleton_content_line">
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
  <Styles.MessageSkeletonContentLine className="message-skeleton_content_line">
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
    <Styles.MessageSkeletonContentLongWord />
    <Styles.MessageSkeletonContentMedWord />
  </Styles.MessageSkeletonContentLine>
);

const LastSkeletonLine = () => (
  <Styles.MessageSkeletonContentLine className="message-skeleton_content_line">
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
  <Styles.MessageSkeletonWrapper className="message-skeleton_wrapper">
    <Styles.MessageSkeletonAvatar className="message-skeleton_avatar" />
    <Styles.MessageSkeletonContent className="message-skeleton_content">
      <Styles.MessageSkeletonUsername className="message-skeleton_username" />
      <FirstSkeletonLine />
      <SecondSkeletonLine />
      <LastSkeletonLine />
    </Styles.MessageSkeletonContent>
  </Styles.MessageSkeletonWrapper>
);
