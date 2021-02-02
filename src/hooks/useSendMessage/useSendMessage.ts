import { useMutation } from 'react-apollo-hooks'
import SEND_MESSAGE from './SendMessage.graphql'
import { MESSAGES } from '../useMessages'
import { useRouter } from '@hooks'
import {Message} from '@generated';
import { addNotification } from "notify";

export const useSendMessage = () => {
  const { channel } = useRouter()
  const sendMessage = useMutation<any>(SEND_MESSAGE);

  return async (content: string) =>
    await sendMessage({
      variables: { channel, content },
      optimisticResponse: {
        __typename: 'Mutation',
        sendMessage: {
          __typename: 'Message',
          id: Math.random(),
          createdAt: +new Date(),
          editedAt: null,
          content,
          // TODO: Get the guests info to provide the proper optimistic response
          author: {
            id: '',
            username: '',
            discriminator: '0000',
            avatarURL: null,
            __typename: 'GuestMember'
          },
          reactions: [],
          attachments: [],
          embeds: []
        }
      }
    }).catch(error => addNotification({
      level: 'error',
      title: 'Error sending message',
      message: error.toString(),
      autoDismiss: 0
    }))
}
