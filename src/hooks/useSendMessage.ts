/* eslint-disable no-underscore-dangle */
import { sendMessageMutation } from '@hooks/messagesQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState } from '@state';
import { useMutation } from 'urql';

interface UseSendMessageProps {
  thread?: string | null;
}

export const useSendMessage = ({ thread }: UseSendMessageProps) => {
  const [, sendMutation] = useMutation(sendMessageMutation);
  const { channelId } = useAppRouter();
  const user = useStoreState(state => state.user.data);

  const sendMessage = async (
    content: string,
    fileName?: string,
    fileData?: string,
    fileAlt?: string
  ) => {
    if (!user) return;

    await sendMutation(
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

  //   console.log(sendMessageRes.extensions);

  return { sendMessage };
};
