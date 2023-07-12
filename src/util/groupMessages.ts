/* eslint-disable no-plusplus */
import { APIMessage } from 'discord-api-types/v10';

/**
 * Takes an array of messages and groups them if the previous message was sent by
 * the same author.
 *
 * @param messages
 * @returns groupedMessages
 */
export function groupMessages(messages: APIMessage[]): APIMessage[][] {
  const groupedMessages: APIMessage[][] = [];
  const messageLength = messages.length;

  for (let i = 0; i < messageLength; i++) {
    const message = messages[i];

    if (i === 0) {
      groupedMessages.push([]);
      groupedMessages[0].push(message);
    } else if (i > 0) {
      const prevMessageGroup = groupedMessages[groupedMessages.length - 1];

      const prevMsgGroupAuthor = prevMessageGroup[0].author;

      const sameAuthor =
        prevMsgGroupAuthor.id === message.author.id &&
        prevMsgGroupAuthor.username === message.author.username;

      if (sameAuthor) {
        prevMessageGroup.push(message);
      } else {
        groupedMessages.push([message]);
      }
    }
  }

  return groupedMessages;
}
