/* eslint-disable no-bitwise */
import { Message } from '@graphql/graphql';
import { StateMessages } from 'types/messages.types';

export function getOptimisticIndex(messages: StateMessages[], recentMessage: Message) {
  return messages.findIndex(m => {
    // trims spaces so Discord's normalization doesn't break it
    const msgFlags = m.flags as number;

    return (
      m.content?.replace(/ /g, '') === recentMessage.content.replace(/ /g, '') &&
      msgFlags & (1 << 4)
    );
  });
}
