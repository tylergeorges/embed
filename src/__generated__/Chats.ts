/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Chats
// ====================================================

export interface Chats_getChats_DirectChat_recipient {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Chats_getChats_DirectChat {
  __typename: "DirectChat";
  content: string;
  id: string;
  recipient: Chats_getChats_DirectChat_recipient;
}

export interface Chats_getChats_DirectGroupChat_recipients {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Chats_getChats_DirectGroupChat {
  __typename: "DirectGroupChat";
  content: string;
  id: string;
  ownerId: string;
  recipients: Chats_getChats_DirectGroupChat_recipients[];
}

export type Chats_getChats = Chats_getChats_DirectChat | Chats_getChats_DirectGroupChat;

export interface Chats {
  getChats: Chats_getChats[];
}

export interface ChatsVariables {
  guild: string;
}
