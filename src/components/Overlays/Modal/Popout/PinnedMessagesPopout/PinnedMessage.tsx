import * as Styles from '@components/Overlays/Modal/styles';
import { Message } from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';

interface PinnedMessageProps {
  message: APIMessage;
  isThread: boolean;
}

export const PinnedMessage = ({ message, isThread }: PinnedMessageProps) => (
  <Styles.PinnedMesageListItem>
    <Message message={message} isFirstMessage thread={isThread} />
  </Styles.PinnedMesageListItem>
);
