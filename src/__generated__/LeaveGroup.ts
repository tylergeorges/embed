/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LeaveGroup
// ====================================================

export interface LeaveGroup_leaveGroup {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface LeaveGroup {
  leaveGroup: LeaveGroup_leaveGroup;
}

export interface LeaveGroupVariables {
  guild: string;
  chat: string;
}
