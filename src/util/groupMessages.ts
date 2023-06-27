/* eslint-disable no-plusplus */
import { APIMessage, MessageType } from 'discord-api-types/v10';

function dateToMilli(date: Date) {
  return date.getTime() / 1000;
  // return Number(new Date(timestamp)) / 1000;
}

function isGroupRecent(prevMessage: APIMessage, recentMessage: APIMessage, maxGroupTime: number) {
  const prevMessageDate = new Date(prevMessage.timestamp);
  const recentMessageDate = new Date(recentMessage.timestamp);

  if (prevMessageDate.getDate() !== recentMessageDate.getDate()) return false;

  const prevMsgMin = dateToMilli(prevMessageDate) / 60;
  const recentMsgMin = dateToMilli(recentMessageDate) / 60;

  const timeFromLastMessage = Math.abs(prevMsgMin - recentMsgMin);

  return timeFromLastMessage < maxGroupTime;
}

function messageIsGroupable(prevMessage: APIMessage, recentMessage: APIMessage) {
  if (prevMessage.author.id !== recentMessage.author.id) return false;

  const isRecent = isGroupRecent(prevMessage, recentMessage, 7);

  return isRecent && recentMessage.type === MessageType.Default;
}
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
  // const nowTimestamp = new Date() / 1000;

  for (let i = 0; i < messageLength; i++) {
    const message = messages[i];

    if (i === 0) {
      groupedMessages.push([]);
      groupedMessages[0].push(message);
    } else if (i > 0) {
      const prevMessageGroup = groupedMessages[groupedMessages.length - 1];

      const isGroupable = messageIsGroupable(
        prevMessageGroup[prevMessageGroup.length - 1],
        message
      );

      if (isGroupable) {
        prevMessageGroup.push(message);
      } else {
        groupedMessages.push([message]);
      }
    }
  }

  return groupedMessages;
}
