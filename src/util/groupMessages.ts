/* eslint-disable no-plusplus */
import { ExpandedAPIMessage } from 'types/messages.types';

function dateToMilli(date: Date) {
  return date.getTime() / 1000;
}

function isGroupRecent(
  prevMessage: ExpandedAPIMessage,
  recentMessage: ExpandedAPIMessage,
  maxGroupTime: number
) {
  const prevMessageDate = new Date(prevMessage?.timestamp);
  const recentMessageDate = new Date(recentMessage?.timestamp);

  if (prevMessageDate.getDate() !== recentMessageDate.getDate()) return false;

  const prevMsgMin = dateToMilli(prevMessageDate) / 60;
  const recentMsgMin = dateToMilli(recentMessageDate) / 60;

  const timeFromLastMessage = Math.abs(prevMsgMin - recentMsgMin);

  return timeFromLastMessage < maxGroupTime;
}

function messageIsGroupable(prevMessage: ExpandedAPIMessage, recentMessage: ExpandedAPIMessage) {
  const isRecent = isGroupRecent(prevMessage, recentMessage, 7);

  const sameAuthor =
    recentMessage.author.id === prevMessage.author.id &&
    recentMessage.author.bot === prevMessage.author.bot &&
    recentMessage.author.flags === prevMessage.author.flags &&
    recentMessage.isGuest === prevMessage.isGuest;

  return sameAuthor && isRecent;
}

/**
 * Takes an array of messages and groups them if the previous message was sent by
 * the same author.
 *
 * @param messages
 * @returns groupedMessages
 */
export function groupMessages(messages: ExpandedAPIMessage[]): ExpandedAPIMessage[][] {
  const groupedMessages: ExpandedAPIMessage[][] = [];
  const messageLength = messages.length;

  for (let i = 0; i < messageLength; i++) {
    const message = messages[i];

    if (i === 0) {
      groupedMessages.push([message]);
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

export function addMessageToGroup(
  initGrouped: ExpandedAPIMessage[][],
  message: ExpandedAPIMessage
): ExpandedAPIMessage[][] {
  const groupedMessages = [...initGrouped];

  const prevMessageGroup = groupedMessages[groupedMessages.length - 1];
  const latestMessage = prevMessageGroup[prevMessageGroup.length - 1];

  const isGroupable = messageIsGroupable(latestMessage, message);

  if (isGroupable) {
    prevMessageGroup.push(message);
  } else {
    groupedMessages.push([message]);
  }

  return groupedMessages;
}
