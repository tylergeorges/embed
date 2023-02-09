/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Chat
// ====================================================

export interface Chat_DirectChat_recipient {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Chat_DirectChat {
  __typename: "DirectChat";
  id: string;
  recipient: Chat_DirectChat_recipient;
  content: string;
  unreadMessages: number;
}

export interface Chat_DirectGroupChat_recipients {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Chat_DirectGroupChat {
  __typename: "DirectGroupChat";
  id: string;
  ownerId: string;
  recipients: Chat_DirectGroupChat_recipients[];
  content: string;
  unreadMessages: number;
}

export type Chat = Chat_DirectChat | Chat_DirectGroupChat;
