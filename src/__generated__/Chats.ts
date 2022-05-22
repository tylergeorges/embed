/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Chats
// ====================================================

export interface Chats_getChats_recipient {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Chats_getChats {
  __typename: "DirectChat";
  recipient: Chats_getChats_recipient;
  content: string;
}

export interface Chats {
  getChats: Chats_getChats[];
}

export interface ChatsVariables {
  guild: string;
}
