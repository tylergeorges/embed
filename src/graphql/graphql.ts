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
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type AnnouncementChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
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

export type ForumChannelMessageBunchArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type ForumChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
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

export type GuildTokenSettings = {
  __typename?: 'GuildTokenSettings';
  channelId?: Maybe<Scalars['String']>;
  guildId: Scalars['String'];
  settings: GuildSettings;
  threadId?: Maybe<Scalars['String']>;
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
  getTokenSettings: GuildTokenSettings;
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

export type QueryGetTokenSettingsArgs = {
  token: Scalars['String'];
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
  /** @deprecated Use messageV2 instead */
  message?: Maybe<Message>;
  /** @deprecated Use messageDeleteV2 instead */
  messageDelete?: Maybe<DeletedMessage>;
  /** @deprecated Use messageDeleteBulkV2 instead */
  messageDeleteBulk?: Maybe<BulkDeletedMessages>;
  messageDeleteBulkV2?: Maybe<BulkDeletedMessages>;
  messageDeleteV2?: Maybe<DeletedMessage>;
  /** @deprecated Use messageUpdateV2 instead */
  messageUpdate?: Maybe<UpdatedMessage>;
  messageUpdateV2?: Maybe<UpdatedMessage>;
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

export type SubscriptionMessageDeleteBulkV2Args = {
  channels?: InputMaybe<Array<Scalars['String']>>;
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};

export type SubscriptionMessageDeleteV2Args = {
  channels?: InputMaybe<Array<Scalars['String']>>;
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};

export type SubscriptionMessageUpdateArgs = {
  channel: Scalars['String'];
  guild: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
};

export type SubscriptionMessageUpdateV2Args = {
  channels?: InputMaybe<Array<Scalars['String']>>;
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
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type TextChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
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
  locked: Scalars['Boolean'];
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
  onlyFetchFirstMessage?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type ThreadChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
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
  profile: UserProfile;
  roles?: Maybe<Array<Scalars['String']>>;
  system: Scalars['Boolean'];
};

export type UserProfileArgs = {
  guild: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  buttons: Array<UserProfileButton>;
};

export type UserProfileButton = {
  __typename?: 'UserProfileButton';
  action?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  iconLocation?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
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
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type VoiceChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  messageId?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  threadId?: InputMaybe<Scalars['String']>;
};

export type TextChannelFragment = {
  __typename?: 'TextChannel';
  id: string;
  name: string;
  type: ChannelType;
  position: number;
  canSend: boolean;
  topic?: string | null;
  category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
  threads?: Array<
    | { __typename?: 'AnnouncementChannel'; id: string; name: string }
    | { __typename?: 'ForumChannel'; id: string; name: string }
    | { __typename?: 'TextChannel'; id: string; name: string }
    | { __typename?: 'ThreadChannel'; id: string; name: string }
    | { __typename?: 'VoiceChannel'; id: string; name: string }
  > | null;
} & { ' $fragmentName'?: 'TextChannelFragment' };

export type AnnouncementChannelFragment = {
  __typename?: 'AnnouncementChannel';
  id: string;
  name: string;
  type: ChannelType;
  position: number;
  canSend: boolean;
  topic?: string | null;
  category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
  threads?: Array<
    | { __typename?: 'AnnouncementChannel'; id: string; name: string }
    | { __typename?: 'ForumChannel'; id: string; name: string }
    | { __typename?: 'TextChannel'; id: string; name: string }
    | { __typename?: 'ThreadChannel'; id: string; name: string }
    | { __typename?: 'VoiceChannel'; id: string; name: string }
  > | null;
} & { ' $fragmentName'?: 'AnnouncementChannelFragment' };

export type GuildQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GuildQuery = {
  __typename: 'Query';
  guild: {
    __typename: 'Guild';
    id: string;
    name: string;
    icon?: string | null;
    memberCount: number;
    rulesChannelId?: string | null;
    banner?: string | null;
    splash?: string | null;
    partnered: string;
    verified: string;
    tier: string;
    settings: { __typename: 'GuildSettings'; readonly: boolean; guestMode: boolean };
    roles: Array<{
      __typename: 'Role';
      id: string;
      name: string;
      position: number;
      color: number;
      icon?: string | null;
      unicodeEmoji?: string | null;
    }>;
    emojis: Array<{
      __typename?: 'Emoji';
      id: string;
      name: string;
      animated: boolean;
      available: boolean;
    }>;
    channels: Array<
      | {
          __typename: 'AnnouncementChannel';
          id: string;
          topic?: string | null;
          name: string;
          type: ChannelType;
          position: number;
          canSend: boolean;
          rateLimitPerUser?: number | null;
          threads?: Array<
            | { __typename: 'AnnouncementChannel'; id: string }
            | { __typename: 'ForumChannel'; id: string }
            | { __typename: 'TextChannel'; id: string }
            | {
                __typename: 'ThreadChannel';
                id: string;
                type: ChannelType;
                name: string;
                parentId: string;
              }
            | { __typename: 'VoiceChannel'; id: string }
          > | null;
          category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
        }
      | {
          __typename: 'ForumChannel';
          id: string;
          name: string;
          type: ChannelType;
          position: number;
          canSend: boolean;
          rateLimitPerUser?: number | null;
          category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
        }
      | {
          __typename: 'TextChannel';
          topic?: string | null;
          id: string;
          name: string;
          type: ChannelType;
          position: number;
          canSend: boolean;
          rateLimitPerUser?: number | null;
          threads?: Array<
            | { __typename?: 'AnnouncementChannel' }
            | { __typename?: 'ForumChannel' }
            | { __typename?: 'TextChannel' }
            | {
                __typename: 'ThreadChannel';
                id: string;
                type: ChannelType;
                name: string;
                parentId: string;
              }
            | { __typename?: 'VoiceChannel' }
          > | null;
          category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
        }
      | {
          __typename: 'ThreadChannel';
          id: string;
          type: ChannelType;
          name: string;
          parentId: string;
          position: number;
          canSend: boolean;
          rateLimitPerUser?: number | null;
          category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
        }
      | {
          __typename: 'VoiceChannel';
          id: string;
          name: string;
          type: ChannelType;
          position: number;
          canSend: boolean;
          rateLimitPerUser?: number | null;
          category?: { __typename?: 'Category'; id: string; name: string; position: number } | null;
        }
    >;
  };
};

export type EmbedFragment = {
  __typename?: 'Embed';
  title?: string | null;
  description?: string | null;
  url?: string | null;
  timestamp?: string | null;
  color?: number | null;
  type?: string | null;
  author?: {
    __typename?: 'EmbedAuthor';
    url?: string | null;
    name?: string | null;
    proxyIconUrl?: string | null;
  } | null;
  fields?: Array<{
    __typename?: 'EmbedField';
    value: string;
    name: string;
    inline?: boolean | null;
  }> | null;
  image?: {
    __typename?: 'EmbedImage';
    url?: string | null;
    proxyUrl?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  provider?: { __typename?: 'EmbedProvider'; name?: string | null; url?: string | null } | null;
  footer?: { __typename?: 'EmbedFooter'; proxyIconUrl?: string | null; text: string } | null;
  thumbnail?: {
    __typename?: 'EmbedThumbnail';
    height?: number | null;
    width?: number | null;
    url?: string | null;
    proxyUrl?: string | null;
  } | null;
  video?: {
    __typename?: 'EmbedVideo';
    height?: number | null;
    width?: number | null;
    url?: string | null;
    proxyUrl?: string | null;
  } | null;
} & { ' $fragmentName'?: 'EmbedFragment' };

export type BaseMessageFragment = {
  __typename: 'Message';
  id: string;
  channelId: string;
  content: string;
  type: MessageType;
  flags?: number | null;
  createdAt: any;
  editedAt?: any | null;
  isGuest: boolean;
  author: {
    __typename: 'User';
    avatarUrl: string;
    bot: boolean;
    discrim: string;
    id: string;
    flags?: number | null;
    name: string;
    roles?: Array<string> | null;
    system: boolean;
    isWebhook: boolean;
  };
  attachments: Array<{
    __typename?: 'Attachment';
    url: string;
    height?: number | null;
    width?: number | null;
    filename: string;
    size: number;
  }>;
  stickers: Array<{
    __typename?: 'Sticker';
    id: string;
    name: string;
    formatType: FormatType;
    lottieData?: string | null;
  }>;
  reactions?: Array<{
    __typename?: 'Reaction';
    count: number;
    emojiId?: string | null;
    emojiName?: string | null;
    animated?: boolean | null;
  }> | null;
  messageReference?: {
    __typename?: 'MessageReference';
    guildId?: string | null;
    channelId: string;
    messageId?: string | null;
  } | null;
  embeds: Array<{ __typename?: 'Embed' } & { ' $fragmentRefs'?: { EmbedFragment: EmbedFragment } }>;
  mentions: Array<{ __typename?: 'Mention'; id: string; type: MentionType; name: string }>;
  interaction?: {
    __typename?: 'MessageInteraction';
    name: string;
    user: {
      __typename?: 'Author';
      id: string;
      username: string;
      discriminator: string;
      avatarUrl: string;
    };
  } | null;
  thread?: {
    __typename?: 'Thread';
    id: string;
    name: string;
    archivedAt?: any | null;
    locked: boolean;
    messageCount: number;
  } | null;
} & { ' $fragmentName'?: 'BaseMessageFragment' };

export type MessageFragment = ({
  __typename: 'Message';
  id: string;
  referencedMessage?:
    | ({ __typename: 'Message'; id: string } & {
        ' $fragmentRefs'?: { BaseMessageFragment: BaseMessageFragment };
      })
    | null;
} & { ' $fragmentRefs'?: { BaseMessageFragment: BaseMessageFragment } }) & {
  ' $fragmentName'?: 'MessageFragment';
};

export type UpdatedMessageFragment = {
  __typename?: 'UpdatedMessage';
  id: string;
  content?: string | null;
  type?: MessageType | null;
  flags?: number | null;
  createdAt?: any | null;
  editedAt?: any | null;
  author?: {
    __typename: 'User';
    avatarUrl: string;
    bot: boolean;
    discrim: string;
    id: string;
    flags?: number | null;
    name: string;
    roles?: Array<string> | null;
  } | null;
  attachments?: Array<{
    __typename?: 'Attachment';
    url: string;
    height?: number | null;
    width?: number | null;
    filename: string;
    size: number;
  }> | null;
  stickers?: Array<{
    __typename?: 'Sticker';
    id: string;
    name: string;
    formatType: FormatType;
    lottieData?: string | null;
  }> | null;
  reactions?: Array<{
    __typename?: 'Reaction';
    count: number;
    emojiId?: string | null;
    emojiName?: string | null;
    animated?: boolean | null;
  }> | null;
  messageReference?: {
    __typename?: 'MessageReference';
    guildId?: string | null;
    channelId: string;
    messageId?: string | null;
  } | null;
  embeds?: Array<
    { __typename?: 'Embed' } & { ' $fragmentRefs'?: { EmbedFragment: EmbedFragment } }
  > | null;
  mentions?: Array<{ __typename?: 'Mention'; id: string; type: MentionType; name: string }> | null;
  interaction?: {
    __typename?: 'MessageInteraction';
    name: string;
    user: {
      __typename?: 'Author';
      id: string;
      username: string;
      discriminator: string;
      avatarUrl: string;
    };
  } | null;
  thread?: {
    __typename?: 'Thread';
    id: string;
    name: string;
    archivedAt?: any | null;
    locked: boolean;
    messageCount: number;
  } | null;
} & { ' $fragmentName'?: 'UpdatedMessageFragment' };

export type MessagesQueryQueryVariables = Exact<{
  guild: Scalars['String'];
  channel: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type MessagesQueryQuery = {
  __typename: 'Query';
  channel:
    | {
        __typename: 'AnnouncementChannel';
        id: string;
        messageBunch: {
          __typename?: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
          pinnedMessages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      }
    | {
        __typename: 'ForumChannel';
        id: string;
        messageBunch: {
          __typename?: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      }
    | {
        __typename: 'TextChannel';
        id: string;
        messageBunch: {
          __typename: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
          pinnedMessages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      }
    | {
        __typename: 'ThreadChannel';
        id: string;
        messageBunch: {
          __typename: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      }
    | {
        __typename: 'VoiceChannel';
        id: string;
        messageBunch: {
          __typename?: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      };
};

export type MoreMessagesQueryVariables = Exact<{
  guild: Scalars['String'];
  channel: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
  around?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type MoreMessagesQuery = {
  __typename: 'Query';
  channel:
    | { __typename: 'AnnouncementChannel'; id: string }
    | { __typename: 'ForumChannel'; id: string }
    | {
        __typename: 'TextChannel';
        id: string;
        messageBunch: {
          __typename: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      }
    | {
        __typename: 'ThreadChannel';
        id: string;
        messageBunch: {
          __typename: 'MessageBunch';
          messages: Array<
            { __typename: 'Message'; id: string } & {
              ' $fragmentRefs'?: { MessageFragment: MessageFragment };
            }
          >;
        };
      }
    | { __typename: 'VoiceChannel'; id: string };
};

export type MessageUpdatedSubscriptionVariables = Exact<{
  guild: Scalars['String'];
  channel: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
}>;

export type MessageUpdatedSubscription = {
  __typename?: 'Subscription';
  messageUpdateV2?:
    | ({ __typename: 'UpdatedMessage'; id: string } & {
        ' $fragmentRefs'?: { UpdatedMessageFragment: UpdatedMessageFragment };
      })
    | null;
};

export type NewMessageSubscriptionVariables = Exact<{
  guild: Scalars['String'];
  channel: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
}>;

export type NewMessageSubscription = {
  __typename?: 'Subscription';
  messageV2?:
    | ({ __typename: 'Message'; id: string } & {
        ' $fragmentRefs'?: { MessageFragment: MessageFragment };
      })
    | null;
};

export type MessageDeletedSubscriptionVariables = Exact<{
  guild: Scalars['String'];
  channel: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
}>;

export type MessageDeletedSubscription = {
  __typename?: 'Subscription';
  messageDeleteV2?: { __typename: 'DeletedMessage'; id: string } | null;
};

export type SendMessageMutationVariables = Exact<{
  channel: Scalars['String'];
  content: Scalars['String'];
  threadId?: InputMaybe<Scalars['String']>;
  fileData?: InputMaybe<Scalars['String']>;
  fileName?: InputMaybe<Scalars['String']>;
  fileAlt?: InputMaybe<Scalars['String']>;
}>;

export type SendMessageMutation = {
  __typename: 'Mutation';
  sendMessage: { __typename: 'Message'; id: string } & {
    ' $fragmentRefs'?: { MessageFragment: MessageFragment };
  };
};

export const TextChannelFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TextChannel' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TextChannel' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'position' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canSend' } },
          { kind: 'Field', name: { kind: 'Name', value: 'topic' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'threads' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<TextChannelFragment, unknown>;
export const AnnouncementChannelFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AnnouncementChannel' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnouncementChannel' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'position' } },
          { kind: 'Field', name: { kind: 'Name', value: 'canSend' } },
          { kind: 'Field', name: { kind: 'Name', value: 'topic' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'threads' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AnnouncementChannelFragment, unknown>;
export const EmbedFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Embed' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Embed' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proxyIconUrl' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'fields' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'inline' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'image' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proxyUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'provider' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'footer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'proxyIconUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'thumbnail' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proxyUrl' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'video' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proxyUrl' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EmbedFragment, unknown>;
export const BaseMessageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BaseMessage' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'channelId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'flags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'editedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isGuest' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bot' } },
                { kind: 'Field', name: { kind: 'Name', value: 'discrim' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isWebhook' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stickers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'formatType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lottieData' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'reactions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emojiId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emojiName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'animated' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageReference' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'channelId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'messageId' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'embeds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Embed' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mentions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'interaction' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'discriminator' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'thread' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'archivedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'messageCount' } }
              ]
            }
          }
        ]
      }
    },
    ...EmbedFragmentDoc.definitions
  ]
} as unknown as DocumentNode<BaseMessageFragment, unknown>;
export const MessageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Message' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BaseMessage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'referencedMessage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'BaseMessage' } }
              ]
            }
          }
        ]
      }
    },
    ...BaseMessageFragmentDoc.definitions
  ]
} as unknown as DocumentNode<MessageFragment, unknown>;
export const UpdatedMessageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UpdatedMessage' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdatedMessage' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'flags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'editedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bot' } },
                { kind: 'Field', name: { kind: 'Name', value: 'discrim' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attachments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                { kind: 'Field', name: { kind: 'Name', value: 'filename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stickers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'formatType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lottieData' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'reactions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emojiId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emojiName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'animated' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageReference' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'channelId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'messageId' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'embeds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Embed' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mentions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'interaction' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'discriminator' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'thread' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'archivedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'messageCount' } }
              ]
            }
          }
        ]
      }
    },
    ...EmbedFragmentDoc.definitions
  ]
} as unknown as DocumentNode<UpdatedMessageFragment, unknown>;
export const GuildDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Guild' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'icon' } },
                { kind: 'Field', name: { kind: 'Name', value: 'memberCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rulesChannelId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                { kind: 'Field', name: { kind: 'Name', value: 'splash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'partnered' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tier' } },
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'settings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'readonly' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'guestMode' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'icon' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'unicodeEmoji' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emojis' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'animated' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'channels' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canSend' } },
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'ThreadChannel' }
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'parentId' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'position' } }
                          ]
                        }
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'TextChannel' }
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'topic' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'threads' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                      kind: 'NamedType',
                                      name: { kind: 'Name', value: 'ThreadChannel' }
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: '__typename' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'parentId' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'AnnouncementChannel' }
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'topic' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'threads' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                      kind: 'NamedType',
                                      name: { kind: 'Name', value: 'ThreadChannel' }
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: '__typename' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'parentId' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'rateLimitPerUser' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GuildQuery, GuildQueryVariables>;
export const MessagesQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'messagesQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'around' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'channel' },
            name: { kind: 'Name', value: 'channelV2' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guild' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TextChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'after' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'around' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'around' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pinnedMessages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AnnouncementChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pinnedMessages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'VoiceChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ForumChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ThreadChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'after' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'around' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'around' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MessageFragmentDoc.definitions
  ]
} as unknown as DocumentNode<MessagesQueryQuery, MessagesQueryQueryVariables>;
export const MoreMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MoreMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'around' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'channel' },
            name: { kind: 'Name', value: 'channelV2' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guild' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TextChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'after' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'around' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'around' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ThreadChannel' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'messageBunch' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'threadId' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'limit' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'after' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'before' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } }
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'around' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'around' } }
                          }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'messages' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'Message' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...MessageFragmentDoc.definitions
  ]
} as unknown as DocumentNode<MoreMessagesQuery, MoreMessagesQueryVariables>;
export const MessageUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MessageUpdated' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageUpdateV2' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guild' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channels' },
                value: {
                  kind: 'ListValue',
                  values: [{ kind: 'Variable', name: { kind: 'Name', value: 'channel' } }]
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'threadId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UpdatedMessage' } }
              ]
            }
          }
        ]
      }
    },
    ...UpdatedMessageFragmentDoc.definitions
  ]
} as unknown as DocumentNode<MessageUpdatedSubscription, MessageUpdatedSubscriptionVariables>;
export const NewMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'NewMessage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageV2' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channels' },
                value: {
                  kind: 'ListValue',
                  values: [{ kind: 'Variable', name: { kind: 'Name', value: 'channel' } }]
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guild' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'threadId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Message' } }
              ]
            }
          }
        ]
      }
    },
    ...MessageFragmentDoc.definitions
  ]
} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const MessageDeletedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MessageDeleted' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messageDeleteV2' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channels' },
                value: {
                  kind: 'ListValue',
                  values: [{ kind: 'Variable', name: { kind: 'Name', value: 'channel' } }]
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guild' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'guild' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'threadId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>;
export const SendMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendMessage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fileData' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fileName' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fileAlt' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendMessage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'channel' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'content' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'threadId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fileData' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fileData' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fileName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fileName' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fileAlt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fileAlt' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Message' } }
              ]
            }
          }
        ]
      }
    },
    ...MessageFragmentDoc.definitions
  ]
} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
