/* eslint-disable no-bitwise */
import { Message } from '@graphql/graphql';
import { ExpandedAPIMessage } from 'types/messages.types';

export function getOptimisticIndex(
  messages: ExpandedAPIMessage[] | Message[],
  recentMessage: Message
) {
  return messages.findIndex(m => {
    const msgFlags = m.flags as number;

    return (
      // trims spaces so Discord's normalization doesn't break it
      m.content.replace(/ /g, '') === recentMessage.content.replace(/ /g, '') && msgFlags & (1 << 4)
    );
  });
}
