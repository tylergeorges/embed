/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelName
// ====================================================

export interface ChannelName_channel {
  __typename: "AnnouncementChannel" | "ForumChannel" | "TextChannel" | "ThreadChannel" | "VoiceChannel";
  name: string;
  id: string;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
}

export interface ChannelName {
  channel: ChannelName_channel;
}

export interface ChannelNameVariables {
  guild: string;
  channel: string;
}
