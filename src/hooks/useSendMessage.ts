/* eslint-disable no-underscore-dangle */
import { sendMessageMutation } from '@hooks/messagesQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState } from '@state';
import { useMutation } from 'urql';

interface UseSendMessageProps {
  thread?: string | null;
}

export const useSendMessage = ({ thread }: UseSendMessageProps) => {
  const { channelId } = useAppRouter();
  const [, sendMutation] = useMutation(sendMessageMutation);

  const user = useStoreState(state => state.user.data);

  const sendMessage = (content: string, fileName?: string, fileData?: string, fileAlt?: string) => {
    if (!user) return;

    sendMutation(
      {
        channel: channelId,
        content,
        fileAlt,
        fileData,
        fileName,
        threadId: thread
      },
      { optimistic: true }
    );
  };

  return { sendMessage };
};
