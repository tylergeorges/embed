/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserTag
// ====================================================

export interface UserTag_userData {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  flags: number | null;
  color: number;
}

export interface UserTag {
  userData: UserTag_userData | null;
}

export interface UserTagVariables {
  guild: string;
  user: string;
}
