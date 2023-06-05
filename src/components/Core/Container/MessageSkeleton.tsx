/* eslint-disable no-plusplus */
import {
  MessageSkeletonContentLine,
  MessageSkeletonContent,
  MessageSkeletonUsername,
  MessageSkeletonAvatar,
  MessageSkeletonWrapper,
  MessageSkeletonContentLongWord,
  MessageSkeletonContentShortWord,
  MessageSkeletonContentMedWord
} from '@components/Core/Container/elements';

const FirstSkeletonLine = () => (
  <MessageSkeletonContentLine className="message-skeleton_content_line">
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentShortWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentLongWord />
  </MessageSkeletonContentLine>
);

const SecondSkeletonLine = () => (
  <MessageSkeletonContentLine className="message-skeleton_content_line">
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
  </MessageSkeletonContentLine>
);

const LastSkeletonLine = () => (
  <MessageSkeletonContentLine className="message-skeleton_content_line">
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentLongWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentMedWord />
    <MessageSkeletonContentShortWord />
    <MessageSkeletonContentLongWord />
  </MessageSkeletonContentLine>
);

export const MessageSkeleton = () => (
  <MessageSkeletonWrapper className="message-skeleton_wrapper">
    <MessageSkeletonAvatar className="message-skeleton_avatar" />
    <MessageSkeletonContent className="message-skeleton_content">
      <MessageSkeletonUsername className="message-skeleton_username" />
      <FirstSkeletonLine />
      <SecondSkeletonLine />
      <LastSkeletonLine />
    </MessageSkeletonContent>
  </MessageSkeletonWrapper>
);
