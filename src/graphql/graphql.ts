/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

export type Action = {
  user: User;
};

export type AnnouncementChannel = Channel & {
  __typename?: 'AnnouncementChannel';
  canSend: Scalars['Boolean'];
  category?: Maybe<Category>;
  id: Scalars['String'];
  messageBunch: MessageBunch;
  /** @deprecated This field is deprecated, use `messageBunch` instead */
  messages: Array<Message>;
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  rateLimitPerUser?: Maybe<Scalars['Int']>;
  threads?: Maybe<Array<Channel>>;
  topic?: Maybe<Scalars['String']>;
  type: ChannelType;
};


export type AnnouncementChannelMessageBunchArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};


export type AnnouncementChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type Application = {
  __typename?: 'Application';
  icon: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Attachment = {
  __typename?: 'Attachment';
  filename: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  size: Scalars['Int'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Author = {
  __typename?: 'Author';
  /** @deprecated Use avatarUrl instead. */
  avatar: Scalars['String'];
  avatarUrl: Scalars['String'];
  bot?: Maybe<Scalars['Boolean']>;
  discriminator: Scalars['String'];
  flags?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  isWebhook: Scalars['Boolean'];
  roles: Array<Scalars['String']>;
  system: Scalars['Boolean'];
  username: Scalars['String'];
};

export type BulkDeletedMessages = {
  __typename?: 'BulkDeletedMessages';
  ids: Array<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type Channel = {
  canSend: Scalars['Boolean'];
  category?: Maybe<Category>;
  id: Scalars['String'];
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  rateLimitPerUser?: Maybe<Scalars['Int']>;
  threads?: Maybe<Array<Channel>>;
  type: ChannelType;
};

export enum ChannelType {
  AnnouncementThread = 'AnnouncementThread',
  Dm = 'DM',
  GroupDm = 'GroupDm',
  GuildAnnouncement = 'GuildAnnouncement',
  GuildCategory = 'GuildCategory',
  GuildDirectory = 'GuildDirectory',
  GuildForum = 'GuildForum',
  GuildStageVoice = 'GuildStageVoice',
  GuildText = 'GuildText',
  GuildVoice = 'GuildVoice',
  PrivateThread = 'PrivateThread',
  PublicThread = 'PublicThread',
  Unknown = 'Unknown'
}

export type Chat = {
  content: Scalars['String'];
  guildId: Scalars['String'];
  id: Scalars['String'];
  unreadMessages: Scalars['Int'];
  updatedAt: Scalars['Long'];
};

export type DefaultReaction = {
  __typename?: 'DefaultReaction';
  emojiId?: Maybe<Scalars['String']>;
  emojiName?: Maybe<Scalars['String']>;
};

export type DeletedMessage = {
  __typename?: 'DeletedMessage';
  id: Scalars['String'];
};

export type DirectChat = Chat & {
  __typename?: 'DirectChat';
  content: Scalars['String'];
  guildId: Scalars['String'];
  id: Scalars['String'];
  recipient: User;
  unreadMessages: Scalars['Int'];
  updatedAt: Scalars['Long'];
};

export type DirectGroupChat = Chat & {
  __typename?: 'DirectGroupChat';
  content: Scalars['String'];
  guildId: Scalars['String'];
  id: Scalars['String'];
  ownerId: Scalars['String'];
  recipients: Array<User>;
  unreadMessages: Scalars['Int'];
  updatedAt: Scalars['Long'];
};

export type Embed = {
  __typename?: 'Embed';
  author?: Maybe<EmbedAuthor>;
  color?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<EmbedField>>;
  footer?: Maybe<EmbedFooter>;
  image?: Maybe<EmbedImage>;
  provider?: Maybe<EmbedProvider>;
  thumbnail?: Maybe<EmbedThumbnail>;
  timestamp?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  video?: Maybe<EmbedVideo>;
};

export type EmbedAuthor = {
  __typename?: 'EmbedAuthor';
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  proxyIconUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EmbedField = {
  __typename?: 'EmbedField';
  inline?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  value: Scalars['String'];
};

export type EmbedFooter = {
  __typename?: 'EmbedFooter';
  proxyIconUrl?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type EmbedImage = {
  __typename?: 'EmbedImage';
  height?: Maybe<Scalars['Int']>;
  proxyUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type EmbedProvider = {
  __typename?: 'EmbedProvider';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EmbedThumbnail = {
  __typename?: 'EmbedThumbnail';
  height?: Maybe<Scalars['Int']>;
  proxyUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type EmbedVideo = {
  __typename?: 'EmbedVideo';
  height?: Maybe<Scalars['Int']>;
  proxyUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Emoji = {
  __typename?: 'Emoji';
  animated: Scalars['Boolean'];
  available: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum FormatType {
  Apng = 'APNG',
  Lottie = 'LOTTIE',
  Png = 'PNG',
  Unknown = 'Unknown'
}

export type ForumChannel = Channel & {
  __typename?: 'ForumChannel';
  availableTags?: Maybe<Array<ForumTag>>;
  canSend: Scalars['Boolean'];
  category?: Maybe<Category>;
  defaultForumLayout?: Maybe<Scalars['Int']>;
  defaultReactionEmoji?: Maybe<DefaultReaction>;
  defaultSortOrder?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  rateLimitPerUser?: Maybe<Scalars['Int']>;
  threads?: Maybe<Array<Channel>>;
  topic?: Maybe<Scalars['String']>;
  type: ChannelType;
};

export type ForumTag = {
  __typename?: 'ForumTag';
  emojiId?: Maybe<Scalars['String']>;
  emojiName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  moderated: Scalars['Boolean'];
  name: Scalars['String'];
};

export type Guild = {
  __typename?: 'Guild';
  banner?: Maybe<Scalars['String']>;
  channels: Array<Channel>;
  emojis: Array<Emoji>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** @deprecated Use settings.invite instead. */
  invite: Scalars['String'];
  memberCount: Scalars['Int'];
  name: Scalars['String'];
  owner: Scalars['String'];
  partnered: Scalars['String'];
  roles: Array<Role>;
  rulesChannelId?: Maybe<Scalars['String']>;
  settings: GuildSettings;
  splash?: Maybe<Scalars['String']>;
  tier: Scalars['String'];
  verified: Scalars['String'];
};

export type GuildSettings = {
  __typename?: 'GuildSettings';
  defaultModeration: Scalars['Boolean'];
  directEnabled: Scalars['Boolean'];
  discordMode: Scalars['Boolean'];
  filesEnabled: Scalars['Boolean'];
  guestAvatar?: Maybe<Scalars['String']>;
  guestMode: Scalars['Boolean'];
  guestName?: Maybe<Scalars['String']>;
  hideSidebar?: Maybe<Scalars['Boolean']>;
  invite?: Maybe<Scalars['String']>;
  isCaptchaEnabled: Scalars['Boolean'];
  isCustomAuthEnabled: Scalars['Boolean'];
  readonly: Scalars['Boolean'];
  showVoiceChannels: Scalars['Boolean'];
  singleChannel?: Maybe<Scalars['String']>;
  theme?: Maybe<ThemeSettings>;
};

export type JoinMember = Action & {
  __typename?: 'JoinMember';
  group: DirectGroupChat;
  guildId: Scalars['String'];
  user: User;
};

export type KickMember = Action & {
  __typename?: 'KickMember';
  group: DirectGroupChat;
  guildId: Scalars['String'];
  kicked: Scalars['Boolean'];
  user: User;
};

export type Mention = {
  __typename?: 'Mention';
  id: Scalars['String'];
  name: Scalars['String'];
  type: MentionType;
};

export enum MentionType {
  Channel = 'Channel',
  Member = 'Member',
  Role = 'Role'
}

export type Message = {
  __typename?: 'Message';
  application?: Maybe<Application>;
  attachments: Array<Attachment>;
  author: User;
  channelId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['Long'];
  editedAt?: Maybe<Scalars['Long']>;
  embeds: Array<Embed>;
  flags?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  interaction?: Maybe<MessageInteraction>;
  isGuest: Scalars['Boolean'];
  mentions: Array<Mention>;
  messageReference?: Maybe<MessageReference>;
  reactions?: Maybe<Array<Reaction>>;
  referencedMessage?: Maybe<Message>;
  stickers: Array<Sticker>;
  thread?: Maybe<Thread>;
  type: MessageType;
  unread: Scalars['Boolean'];
};

export type MessageBunch = {
  __typename?: 'MessageBunch';
  messages: Array<Message>;
  pinnedMessages: Array<Message>;
};

export type MessageInteraction = {
  __typename?: 'MessageInteraction';
  id: Scalars['String'];
  name: Scalars['String'];
  user: Author;
};

export type MessageReference = {
  __typename?: 'MessageReference';
  channelId: Scalars['String'];
  guildId?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['String']>;
};

export enum MessageType {
  Call = 'Call',
  ChannelFollowAdd = 'ChannelFollowAdd',
  ChannelIconChange = 'ChannelIconChange',
  ChannelNameChange = 'ChannelNameChange',
  ChannelPinnedMessage = 'ChannelPinnedMessage',
  ChatInputCommand = 'ChatInputCommand',
  ContextMenuCommand = 'ContextMenuCommand',
  Default = 'Default',
  GuildDiscoveryDisqualified = 'GuildDiscoveryDisqualified',
  GuildDiscoveryGracePeriodFinalWarning = 'GuildDiscoveryGracePeriodFinalWarning',
  GuildDiscoveryGracePeriodInitialWarning = 'GuildDiscoveryGracePeriodInitialWarning',
  GuildDiscoveryRequalified = 'GuildDiscoveryRequalified',
  GuildInviteReminder = 'GuildInviteReminder',
  GuildMemberJoin = 'GuildMemberJoin',
  RecipientAdd = 'RecipientAdd',
  RecipientRemove = 'RecipientRemove',
  Reply = 'Reply',
  ThreadCreated = 'ThreadCreated',
  ThreadStarterMessage = 'ThreadStarterMessage',
  Unknown = 'Unknown',
  UserPremiumGuildSubscription = 'UserPremiumGuildSubscription',
  UserPremiumGuildTier1 = 'UserPremiumGuildTier1',
  UserPremiumGuildTier2 = 'UserPremiumGuildTier2',
  UserPremiumGuildTier3 = 'UserPremiumGuildTier3'
}

export type Mutation = {
  __typename?: 'Mutation';
  addMember: Array<User>;
  blockUser: Scalars['Boolean'];
  createGroup: Chat;
  deleteChatMessage: Scalars['String'];
  deleteMessage: Scalars['String'];
  leaveGroup: User;
  markChatAsRead: Scalars['String'];
  removeMember: User;
  sendChat: Message;
  sendMessage: Message;
};


export type MutationAddMemberArgs = {
  guild: Scalars['String'];
  id: Scalars['String'];
  memberIds: Array<Scalars['String']>;
};


export type MutationBlockUserArgs = {
  active?: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  content: Scalars['String'];
  guild: Scalars['String'];
  memberIds: Array<Scalars['String']>;
};


export type MutationDeleteChatMessageArgs = {
  channel: Scalars['String'];
  guild: Scalars['String'];
  id: Scalars['String'];
  isGroup?: InputMaybe<Scalars['Boolean']>;
};


export type MutationDeleteMessageArgs = {
  channel: Scalars['String'];
  id: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};


export type MutationLeaveGroupArgs = {
  guild: Scalars['String'];
  id: Scalars['String'];
};


export type MutationMarkChatAsReadArgs = {
  guild: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  guild: Scalars['String'];
  id: Scalars['String'];
  member: Scalars['String'];
};


export type MutationSendChatArgs = {
  content: Scalars['String'];
  fileAlt?: InputMaybe<Scalars['String']>;
  fileData?: InputMaybe<Scalars['String']>;
  fileName?: InputMaybe<Scalars['String']>;
  guild: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  captchaRes?: InputMaybe<Scalars['String']>;
  channel: Scalars['String'];
  content: Scalars['String'];
  fileAlt?: InputMaybe<Scalars['String']>;
  fileData?: InputMaybe<Scalars['String']>;
  fileName?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** @deprecated Use `channelV2` instead */
  channel: Channel;
  channelV2: Channel;
  directUsers: Array<User>;
  getChats: Array<Chat>;
  getMessagesForChat: Array<Message>;
  guild: Guild;
  hello: Scalars['String'];
  settings: GuildSettings;
  stats: Statistics;
  userData?: Maybe<User>;
};


export type QueryChannelArgs = {
  id: Scalars['String'];
};


export type QueryChannelV2Args = {
  guild: Scalars['String'];
  id: Scalars['String'];
};


export type QueryDirectUsersArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetChatsArgs = {
  guild: Scalars['String'];
};


export type QueryGetMessagesForChatArgs = {
  guild: Scalars['String'];
  id: Scalars['String'];
  isGroup?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGuildArgs = {
  id: Scalars['String'];
};


export type QuerySettingsArgs = {
  id: Scalars['String'];
};


export type QueryUserDataArgs = {
  guild: Scalars['String'];
  id: Scalars['String'];
};

export type Reaction = {
  __typename?: 'Reaction';
  animated?: Maybe<Scalars['Boolean']>;
  count: Scalars['Int'];
  emojiId?: Maybe<Scalars['String']>;
  emojiName?: Maybe<Scalars['String']>;
  me: Scalars['Boolean'];
};

export type Role = {
  __typename?: 'Role';
  color: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Int'];
  unicodeEmoji?: Maybe<Scalars['String']>;
};

export type Statistics = {
  __typename?: 'Statistics';
  channelCount: Scalars['Int'];
  messagesSent: Scalars['Int'];
  onlineGuests: Scalars['Int'];
  serverCount: Scalars['Int'];
};

export type Sticker = {
  __typename?: 'Sticker';
  formatType: FormatType;
  id: Scalars['String'];
  lottieData?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  action?: Maybe<Action>;
  directMessage?: Maybe<Message>;
  message?: Maybe<Message>;
  messageDelete?: Maybe<DeletedMessage>;
  messageDeleteBulk?: Maybe<BulkDeletedMessages>;
  messageUpdate?: Maybe<UpdatedMessage>;
  messageV2?: Maybe<Message>;
};


export type SubscriptionActionArgs = {
  guild: Scalars['String'];
};


export type SubscriptionDirectMessageArgs = {
  guild: Scalars['String'];
};


export type SubscriptionMessageArgs = {
  channel: Scalars['String'];
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};


export type SubscriptionMessageDeleteArgs = {
  channel: Scalars['String'];
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};


export type SubscriptionMessageDeleteBulkArgs = {
  channel: Scalars['String'];
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};


export type SubscriptionMessageUpdateArgs = {
  channel: Scalars['String'];
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};


export type SubscriptionMessageV2Args = {
  channels?: InputMaybe<Array<Scalars['String']>>;
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};

export type TextChannel = Channel & {
  __typename?: 'TextChannel';
  canSend: Scalars['Boolean'];
  category?: Maybe<Category>;
  id: Scalars['String'];
  messageBunch: MessageBunch;
  /** @deprecated This field is deprecated, use `messageBunch` instead */
  messages: Array<Message>;
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  rateLimitPerUser?: Maybe<Scalars['Int']>;
  threads?: Maybe<Array<Channel>>;
  topic?: Maybe<Scalars['String']>;
  type: ChannelType;
};


export type TextChannelMessageBunchArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};


export type TextChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type ThemeColorSettings = {
  __typename?: 'ThemeColorSettings';
  accent?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['String']>;
};

export type ThemeSettings = {
  __typename?: 'ThemeSettings';
  colors: ThemeColorSettings;
  css?: Maybe<Scalars['String']>;
};

export type Thread = {
  __typename?: 'Thread';
  archivedAt?: Maybe<Scalars['Long']>;
  id: Scalars['String'];
  locked: Scalars['Boolean'];
  messageCount: Scalars['Int'];
  name: Scalars['String'];
};

export type ThreadChannel = Channel & {
  __typename?: 'ThreadChannel';
  appliedTags: Array<Scalars['String']>;
  canSend: Scalars['Boolean'];
  category?: Maybe<Category>;
  id: Scalars['String'];
  messageBunch: MessageBunch;
  messageCount: Scalars['Int'];
  /** @deprecated This field is deprecated, use `messageBunch` instead */
  messages: Array<Message>;
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  parentId: Scalars['String'];
  position: Scalars['Int'];
  rateLimitPerUser?: Maybe<Scalars['Int']>;
  threads?: Maybe<Array<Channel>>;
  topic?: Maybe<Scalars['String']>;
  type: ChannelType;
};


export type ThreadChannelMessageBunchArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};


export type ThreadChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type UpdatedMessage = {
  __typename?: 'UpdatedMessage';
  application?: Maybe<Application>;
  attachments?: Maybe<Array<Attachment>>;
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  editedAt?: Maybe<Scalars['Long']>;
  embeds?: Maybe<Array<Embed>>;
  flags?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  interaction?: Maybe<MessageInteraction>;
  isGuest?: Maybe<Scalars['Boolean']>;
  mentions?: Maybe<Array<Mention>>;
  messageReference?: Maybe<MessageReference>;
  reactions?: Maybe<Array<Reaction>>;
  referencedMessage?: Maybe<Message>;
  stickers?: Maybe<Array<Sticker>>;
  thread?: Maybe<Thread>;
  type?: Maybe<MessageType>;
};

export type User = {
  __typename?: 'User';
  /** @deprecated Use avatarUrl instead. */
  avatar: Scalars['String'];
  avatarUrl: Scalars['String'];
  bot: Scalars['Boolean'];
  color: Scalars['Int'];
  discrim: Scalars['String'];
  flags?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  isWebhook: Scalars['Boolean'];
  name: Scalars['String'];
  roles?: Maybe<Array<Scalars['String']>>;
  system: Scalars['Boolean'];
};

export type VoiceChannel = Channel & {
  __typename?: 'VoiceChannel';
  canSend: Scalars['Boolean'];
  category?: Maybe<Category>;
  id: Scalars['String'];
  messageBunch: MessageBunch;
  /** @deprecated This field is deprecated, use `messageBunch` instead */
  messages: Array<Message>;
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  rateLimitPerUser?: Maybe<Scalars['Int']>;
  threads?: Maybe<Array<Channel>>;
  type: ChannelType;
};


export type VoiceChannelMessageBunchArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};


export type VoiceChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type GuildQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GuildQuery = { __typename?: 'Query', guild: { __typename?: 'Guild', id: string, name: string, settings: { __typename?: 'GuildSettings', readonly: boolean }, channels: Array<{ __typename?: 'AnnouncementChannel', id: string, name: string, type: ChannelType, position: number, rateLimitPerUser?: number | null, category?: { __typename?: 'Category', id: string, name: string, position: number } | null } | { __typename?: 'ForumChannel', id: string, name: string, type: ChannelType, position: number, rateLimitPerUser?: number | null, category?: { __typename?: 'Category', id: string, name: string, position: number } | null } | { __typename?: 'TextChannel', id: string, name: string, type: ChannelType, position: number, rateLimitPerUser?: number | null, category?: { __typename?: 'Category', id: string, name: string, position: number } | null } | { __typename?: 'ThreadChannel', id: string, name: string, type: ChannelType, position: number, rateLimitPerUser?: number | null, category?: { __typename?: 'Category', id: string, name: string, position: number } | null } | { __typename?: 'VoiceChannel', id: string, name: string, type: ChannelType, position: number, rateLimitPerUser?: number | null, category?: { __typename?: 'Category', id: string, name: string, position: number } | null }> } };


export const GuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Guild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"guild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readonly"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rateLimitPerUser"}}]}}]}}]}}]} as unknown as DocumentNode<GuildQuery, GuildQueryVariables>;