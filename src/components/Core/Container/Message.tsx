import { MessageAvatar, MessageContentOuterWrapper, MessageContent, MessageUsername } from '@components/Core/Container/elements';
import { APIMessage } from 'discord-api-types/v10';

interface MessageProps {
  message: APIMessage;
}

export const Message = ({ message }: MessageProps) => (
  <MessageContentOuterWrapper className="message-content_outer_wrapper">
    <MessageAvatar
      // src={message.author.avatar}
      src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=80`}
      alt="User Profile Avatar"
      width={40}
      height={40}
      className="message-avatar"
    />

    <MessageContent className="message-content">
      <MessageUsername className="message-username">{message.author.username}</MessageUsername>
      {message.content}
    </MessageContent>
  </MessageContentOuterWrapper>
);
