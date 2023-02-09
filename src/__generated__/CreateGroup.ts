/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGroup
// ====================================================

export interface CreateGroup_createGroup_DirectChat_recipient {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface CreateGroup_createGroup_DirectChat {
  __typename: "DirectChat";
  content: string;
  unreadMessages: number;
  id: string;
  recipient: CreateGroup_createGroup_DirectChat_recipient;
}

export interface CreateGroup_createGroup_DirectGroupChat_recipients {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface CreateGroup_createGroup_DirectGroupChat {
  __typename: "DirectGroupChat";
  content: string;
  unreadMessages: number;
  id: string;
  ownerId: string;
  recipients: CreateGroup_createGroup_DirectGroupChat_recipients[];
}

export type CreateGroup_createGroup = CreateGroup_createGroup_DirectChat | CreateGroup_createGroup_DirectGroupChat;

export interface CreateGroup {
  createGroup: CreateGroup_createGroup;
}

export interface CreateGroupVariables {
  guild: string;
  memberIds: string[];
  content: string;
}
