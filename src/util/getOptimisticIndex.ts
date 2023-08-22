/* eslint-disable no-bitwise */
import { Message } from '@graphql/graphql';
import { APIMessage } from 'discord-api-types/v10';

export function getOptimisticIndex(messages: APIMessage[], recentMessage: Message) {
  return messages.findIndex(m => {
    const msgFlags = m.flags as number;

    return (
      // trims spaces so Discord's normalization doesn't break it
      m.content?.replace(/ /g, '') === recentMessage.content.replace(/ /g, '') &&
      msgFlags & (1 << 4)
    );
  });
}
