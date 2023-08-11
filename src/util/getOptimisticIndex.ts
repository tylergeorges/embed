/* eslint-disable no-bitwise */

import { Message } from '@graphql/graphql';
import { StateMessages } from 'types/messages.types';

export function getOptimisticIndex(messages: StateMessages[], recentMessage: Message) {
  return messages.findIndex(
    m =>
      // trims spaces so Discord's normalization doesn't break it
      (m.content?.replace(/ /g, '') === recentMessage.content.replace(/ /g, '') && m?.flags) ??
      0 & (1 << 4)
  );
}
