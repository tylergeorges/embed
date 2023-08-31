import * as Styles from '@components/Overlays/Modal/styles';
import { Message } from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';

interface PinnedMessageProps {
  message: APIMessage;
}

export const PinnedMessage = ({ message }: PinnedMessageProps) => {
  console.log(message);
  return (
    <Styles.PinnedMesageListItem>
      <Message message={message} isFirstMessage thread={!!message.thread} />
    </Styles.PinnedMesageListItem>
  );
};
