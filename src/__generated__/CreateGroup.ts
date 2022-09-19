/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGroup
// ====================================================

export interface CreateGroup_group_DirectChat_recipient {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface CreateGroup_group_DirectChat {
  __typename: "DirectChat";
  content: string;
  id: string;
  recipient: CreateGroup_group_DirectChat_recipient;
}

export interface CreateGroup_group_DirectGroupChat_recipients {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface CreateGroup_group_DirectGroupChat {
  __typename: "DirectGroupChat";
  content: string;
  id: string;
  recipients: CreateGroup_group_DirectGroupChat_recipients[];
}

export type CreateGroup_group = CreateGroup_group_DirectChat | CreateGroup_group_DirectGroupChat;

export interface CreateGroup {
  group: CreateGroup_group;
}

export interface CreateGroupVariables {
  guild: string;
  memberIds: string[];
  content: string;
}
