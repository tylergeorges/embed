import { TextBoxWrapper, TextBoxInput } from './elements';

interface MessageInputProps {
  /** The name of the current text channel. */
  channelName: string;
}

/** This component handles sending messages to the current text channel.
 *
 * @param channelName                  The name of the current text channel.
 */
export const TextBox = ({ channelName }: MessageInputProps) => (
  // const { t } = useTranslation();
  <TextBoxWrapper className="text-box_wrapper">
    <TextBoxInput placeholder={channelName} className="text-box_input" />
  </TextBoxWrapper>
);
