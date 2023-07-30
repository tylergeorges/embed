/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GuildInfo
// ====================================================

export interface GuildInfo_guild_channels_ThreadChannel_category {
  __typename: "Category";
  name: string;
  position: number;
}

export interface GuildInfo_guild_channels_ThreadChannel {
  __typename: "ThreadChannel" | "VoiceChannel";
  name: string;
  id: string;
  position: number;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
  category: GuildInfo_guild_channels_ThreadChannel_category | null;
}

export interface GuildInfo_guild_channels_TextChannel_category {
  __typename: "Category";
  name: string;
  position: number;
}

export interface GuildInfo_guild_channels_TextChannel_threads {
  __typename: "AnnouncementChannel" | "ForumChannel" | "TextChannel" | "ThreadChannel" | "VoiceChannel";
  id: string;
}

export interface GuildInfo_guild_channels_TextChannel {
  __typename: "TextChannel";
  name: string;
  id: string;
  position: number;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
  category: GuildInfo_guild_channels_TextChannel_category | null;
  topic: string | null;
  threads: GuildInfo_guild_channels_TextChannel_threads[] | null;
}

export interface GuildInfo_guild_channels_AnnouncementChannel_category {
  __typename: "Category";
  name: string;
  position: number;
}

export interface GuildInfo_guild_channels_AnnouncementChannel_threads {
  __typename: "AnnouncementChannel" | "ForumChannel" | "TextChannel" | "ThreadChannel" | "VoiceChannel";
  id: string;
}

export interface GuildInfo_guild_channels_AnnouncementChannel {
  __typename: "AnnouncementChannel";
  name: string;
  id: string;
  position: number;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
  category: GuildInfo_guild_channels_AnnouncementChannel_category | null;
  topic: string | null;
  threads: GuildInfo_guild_channels_AnnouncementChannel_threads[] | null;
}

export interface GuildInfo_guild_channels_ForumChannel_category {
  __typename: "Category";
  name: string;
  position: number;
}

export interface GuildInfo_guild_channels_ForumChannel {
  __typename: "ForumChannel";
  name: string;
  id: string;
  position: number;
  rateLimitPerUser: number | null;
  nsfw: boolean;
  canSend: boolean;
  category: GuildInfo_guild_channels_ForumChannel_category | null;
  topic: string | null;
}

export type GuildInfo_guild_channels = GuildInfo_guild_channels_ThreadChannel | GuildInfo_guild_channels_TextChannel | GuildInfo_guild_channels_AnnouncementChannel | GuildInfo_guild_channels_ForumChannel;

export interface GuildInfo_guild_roles {
  __typename: "Role";
  id: string;
  name: string;
  position: number;
  color: number;
  icon: string | null;
  unicodeEmoji: string | null;
}

export interface GuildInfo_guild_emojis {
  __typename: "Emoji";
  id: string;
  name: string;
  animated: boolean;
  available: boolean;
}

export interface GuildInfo_guild {
  __typename: "Guild";
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
  rulesChannelId: string | null;
  banner: string | null;
  splash: string | null;
  partnered: string;
  verified: string;
  tier: string;
  channels: GuildInfo_guild_channels[];
  roles: GuildInfo_guild_roles[];
  emojis: GuildInfo_guild_emojis[];
}

export interface GuildInfo {
  guild: GuildInfo_guild;
}

export interface GuildInfoVariables {
  guild: string;
}
