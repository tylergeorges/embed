import { useTranslation } from 'react-i18next';

interface MessageInputProps {
  /** The name of the current text channel. */
  channel: string;
}

/** This component handles sending messages to the current text channel.
 *
 * @param channel                   The name of the current text channel.
 */
export const MessageInput = ({ channel }: MessageInputProps) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        height: '7%',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <input
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          border: 'none',
          borderRadius: 8,
          outline: 'none',
          padding: 10,
          fontSize: 14
        }}
        placeholder={t('input.message', { CHANNEL: channel }) as string}
      />
    </div>
  );
};
