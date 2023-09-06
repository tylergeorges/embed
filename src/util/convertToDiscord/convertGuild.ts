import { Guild } from '@graphql/graphql';
import {
  APIGuild,
  APIRole,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildSystemChannelFlags,
  GuildVerificationLevel
} from 'discord-api-types/v10';

export function convertGuild(guild: Guild): APIGuild {
  return {
    id: guild.id,
    afk_channel_id: null,
    afk_timeout: 60,
    application_id: null,
    banner: guild.banner ?? null,
    default_message_notifications: GuildDefaultMessageNotifications.AllMessages,
    description: null,
    discovery_splash: guild.splash ?? null,
    emojis: guild.emojis,
    explicit_content_filter: GuildExplicitContentFilter.AllMembers,
    owner_id: guild.owner,
    features: [],
    hub_type: null,
    icon: guild.icon ?? null,
    mfa_level: GuildMFALevel.None,
    name: guild.name,
    nsfw_level: GuildNSFWLevel.Default,
    roles: guild.roles as APIRole[],
    preferred_locale: 'en-US',
    premium_progress_bar_enabled: false,
    premium_tier: GuildPremiumTier.None,
    public_updates_channel_id: null,
    rules_channel_id: guild.rulesChannelId ?? null,
    safety_alerts_channel_id: null,
    splash: guild.splash ?? null,
    region: '',
    verification_level: GuildVerificationLevel.None,
    system_channel_id: null,
    system_channel_flags: GuildSystemChannelFlags.SuppressRoleSubscriptionPurchaseNotifications,
    stickers: [],
    vanity_url_code: ''
  };
}
