/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DirectUsers
// ====================================================

export interface DirectUsers_directUsers {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
}

export interface DirectUsers {
  directUsers: DirectUsers_directUsers[];
}

export interface DirectUsersVariables {
  name?: string | null;
}
