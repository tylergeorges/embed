import { sendMessageMutation } from '@hooks/messagesQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMutation } from 'urql';

interface UseSendMessageProps {
  thread?: string | null;
}

export const useSendMessage = ({ thread }: UseSendMessageProps) => {
  const [, sendMutation] = useMutation(sendMessageMutation);
  const { channelId } = useAppRouter();

  const sendMessage = (content: string, fileName?: string, fileData?: string, fileAlt?: string) => {
    console.log('mutation ', content, fileName, fileData, fileAlt);

    sendMutation({ channel: channelId, content, fileAlt, fileData, fileName, thread }).then(res => {
      if (res.error) {
        console.error('Error sending message: ', res.error);
      }

      console.log(res);
    });
  };

  return { sendMessage };
};
