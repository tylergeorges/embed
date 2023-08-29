import { MessageType as DiscordMessageType } from 'discord-api-types/v10';
import { MessageType as GqlMessageType } from '@graphql/graphql';

export const messageTypeTable = {
  // ! THREADS
  [GqlMessageType.ThreadCreated]: DiscordMessageType.ThreadCreated,
  [GqlMessageType.ThreadStarterMessage]: DiscordMessageType.ThreadStarterMessage,

  [GqlMessageType.Call]: DiscordMessageType.Call,
  [GqlMessageType.Reply]: DiscordMessageType.Reply,

  // ! CHANNEL
  [GqlMessageType.ChannelPinnedMessage]: DiscordMessageType.ChannelPinnedMessage,
  [GqlMessageType.ChannelIconChange]: DiscordMessageType.ChannelIconChange,
  [GqlMessageType.ChannelNameChange]: DiscordMessageType.ChannelNameChange,
  [GqlMessageType.ChannelFollowAdd]: DiscordMessageType.ChannelFollowAdd,

  // ! INPUT
  [GqlMessageType.ContextMenuCommand]: DiscordMessageType.ContextMenuCommand,
  [GqlMessageType.ChatInputCommand]: DiscordMessageType.ChatInputCommand,

  // ! RECIPIENT
  [GqlMessageType.RecipientAdd]: DiscordMessageType.RecipientAdd,
  [GqlMessageType.RecipientRemove]: DiscordMessageType.RecipientRemove,

  // ! GUILD
  [GqlMessageType.GuildMemberJoin]: DiscordMessageType.UserJoin,
  [GqlMessageType.GuildInviteReminder]: DiscordMessageType.GuildInviteReminder,
  [GqlMessageType.GuildDiscoveryDisqualified]: DiscordMessageType.GuildDiscoveryDisqualified,
  [GqlMessageType.GuildDiscoveryRequalified]: DiscordMessageType.GuildDiscoveryRequalified,
  [GqlMessageType.GuildDiscoveryGracePeriodFinalWarning]:
    DiscordMessageType.GuildDiscoveryGracePeriodFinalWarning,
  [GqlMessageType.GuildDiscoveryGracePeriodInitialWarning]:
    DiscordMessageType.GuildDiscoveryGracePeriodInitialWarning,

  // ! GUILD TIERS
  [GqlMessageType.UserPremiumGuildTier1]: DiscordMessageType.GuildBoostTier1,
  [GqlMessageType.UserPremiumGuildTier2]: DiscordMessageType.GuildBoostTier2,
  [GqlMessageType.UserPremiumGuildTier3]: DiscordMessageType.GuildBoostTier3,
  [GqlMessageType.UserPremiumGuildSubscription]:
    DiscordMessageType.GuildApplicationPremiumSubscription,

  // ! DEFAULT
  [GqlMessageType.Default]: DiscordMessageType.Default,
  [GqlMessageType.Unknown]: DiscordMessageType.Default
} as const;
