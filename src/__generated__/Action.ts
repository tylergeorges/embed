/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: Action
// ====================================================

export interface Action_action_JoinMember_group_recipients {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Action_action_JoinMember_group {
  __typename: "DirectGroupChat";
  id: string;
  ownerId: string;
  content: string;
  unreadMessages: number;
  recipients: Action_action_JoinMember_group_recipients[];
}

export interface Action_action_JoinMember_user {
  __typename: "User";
  id: string;
  name: string;
  discrim: string;
  avatarUrl: string;
  color: number;
  bot: boolean;
  flags: number | null;
}

export interface Action_action_JoinMember {
  __typename: "JoinMember";
  group: Action_action_JoinMember_group;
  user: Action_action_JoinMember_user;
}

export interface Action_action_KickMember_group {
  __typename: "DirectGroupChat";
  id: string;
}

export interface Action_action_KickMember_user {
  __typename: "User";
  id: string;
}

export interface Action_action_KickMember {
  __typename: "KickMember";
  group: Action_action_KickMember_group;
  user: Action_action_KickMember_user;
}

export type Action_action = Action_action_JoinMember | Action_action_KickMember;

export interface Action {
  action: Action_action | null;
}

export interface ActionVariables {
  guild: string;
}
