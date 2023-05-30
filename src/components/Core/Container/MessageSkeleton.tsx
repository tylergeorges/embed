/* eslint-disable no-plusplus */
import {
  MessageSkeletonContentLine,
  MessageSkeletonContent,
  MessageSkeletonUsername,
  MessageSkeletonAvatar,
  MessageSkeletonWrapper,
  MessageSkeletonContentWord
} from '@components/Core/Container/elements';
import { Message as IMessage } from '@graphql/graphql';

export const MessageSkeleton = ({ message }: { message: IMessage }) => (
  <MessageSkeletonWrapper className="message-skeleton_wrapper">
    <MessageSkeletonAvatar className="message-skeleton_avatar" />

    <MessageSkeletonContent className="message-skeleton_content">
      <MessageSkeletonUsername className="message-skeleton_username">
        {message.author.name}
      </MessageSkeletonUsername>
      <MessageSkeletonContentLine className="message-skeleton_content_line">
        <MessageSkeletonContentWord className="message-skeleton_content_word">
          {message.content}
        </MessageSkeletonContentWord>
      </MessageSkeletonContentLine>
    </MessageSkeletonContent>
  </MessageSkeletonWrapper>
);
