/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelName
// ====================================================

export interface ChannelName_channel_TextChannel {
  __typename: "TextChannel";
  name: string;
  id: string;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
}

export interface ChannelName_channel_AnnouncementChannel {
  __typename: "AnnouncementChannel";
  name: string;
  id: string;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
}

export type ChannelName_channel = ChannelName_channel_TextChannel | ChannelName_channel_AnnouncementChannel;

export interface ChannelName {
  channel: ChannelName_channel;
}

export interface ChannelNameVariables {
  guild: string;
  channel: string;
}
