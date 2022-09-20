/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveMember
// ====================================================

export interface RemoveMember_removeMember {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface RemoveMember {
  removeMember: RemoveMember_removeMember;
}

export interface RemoveMemberVariables {
  guild: string;
  chat: string;
  member: string;
}
