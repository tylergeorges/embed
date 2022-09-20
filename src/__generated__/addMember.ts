/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMember
// ====================================================

export interface AddMember_addMember {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface AddMember {
  addMember: AddMember_addMember;
}

export interface AddMemberVariables {
  guild: string;
  chat: string;
  member: string;
}
