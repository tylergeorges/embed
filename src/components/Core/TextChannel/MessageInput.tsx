import { TextInput, TextInputWrapper } from './elements';

interface MessageInputProps {
  /** The name of the current text channel. */
  channelName: string;
}

/** This component handles sending messages to the current text channel.
 *
 * @param channelName                  The name of the current text channel.
 */
export const MessageInput = ({ channelName }: MessageInputProps) => (
  // const { t } = useTranslation();
  <TextInputWrapper>
    <TextInput placeholder={channelName} />
  </TextInputWrapper>
);
