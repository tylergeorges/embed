/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_user_profile_buttons {
  __typename: "UserProfileButton";
  content: string;
  url: string | null;
  action: string | null;
  icon: string | null;
  iconLocation: string | null;
  color: string | null;
}

export interface Profile_user_profile {
  __typename: "UserProfile";
  buttons: Profile_user_profile_buttons[];
}

export interface Profile_user {
  __typename: "User";
  id: string;
  profile: Profile_user_profile;
}

export interface Profile {
  user: Profile_user | null;
}

export interface ProfileVariables {
  guild: string;
  user: string;
}
