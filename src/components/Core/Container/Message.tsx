import {
  MessageAvatar,
  MessageContentOuterWrapper,
  MessageContent,
  MessageUsername
} from '@components/Core/Container/elements';
import { Message as IMessage } from '@graphql/graphql';

interface MessageProps {
  message: IMessage;
}

export const Message = ({ message }: MessageProps) => (
  <MessageContentOuterWrapper className="message-content_outer_wrapper">
    <MessageAvatar
      src={message.author.avatarUrl}
      alt="User Profile Avatar"
      width={40}
      height={40}
      className="message-avatar"
    />

    <MessageContent className="message-content">
      <MessageUsername className="message-username">{message.author.name}</MessageUsername>
      {message.content}
    </MessageContent>
  </MessageContentOuterWrapper>
);
