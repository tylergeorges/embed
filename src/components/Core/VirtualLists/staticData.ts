import { APIMessage, APIUser, MessageType } from 'discord-api-types/v10';

// const userProfile: UserProfile = {
//   buttons: [],
//   __typename: 'UserProfile'
// };

const user1: APIUser = {
  id: '171654190408531968',
  avatar: 'ef8d310fc178ab15ae4ecb4e16adebed',
  bot: false,
  system: false,
  username: 'kneadle',
  discriminator: '2645'
};
const user2: APIUser = {
  id: '96626362277720064',
  avatar: '4eb1d7a4ec7aa51f90061ee150d383b8',
  discriminator: '0001',
  bot: false,
  username: 'daave',
  system: false
};
const user3: APIUser = {
  bot: true,
  id: '998882498719273090',
  username: 'Discord Developers #api-announcements',
  avatar: '0ad0ccf2bc8dffbaddcf39825c4b5706',
  discriminator: '0000'
};

const users: APIUser[] = [user1, user2, user3];

const getRandomItem = <T = unknown>(itemArr: T[]): T => {
  const idx = Math.floor(Math.random() * itemArr.length);
  return itemArr[idx];
};

const messageContentArr: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ',
  'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat ',
  'qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
  'laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem ',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  'minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ',
  'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];

const getRandMessage = (user: APIUser): APIMessage => {
  const content = getRandomItem(messageContentArr);
  const randId = Math.random() * 99999999;

  return {
    content,
    author: user,
    attachments: [],
    channel_id: '309009333436547082',
    edited_timestamp: null,
    embeds: [],
    id: `${randId}`,
    mention_everyone: false,
    mention_roles: [],
    mentions: [],
    pinned: false,
    timestamp: Date.now().toLocaleString(),
    type: MessageType.Default,
    tts: false
  };
};

export const generateMessage = () => {
  const user = getRandomItem(users);
  const message = getRandMessage(user);

  return message;
};

export const loadMoreStaticMessages: APIMessage[] = [
  {
    id: '1042882684902453278',
    type: 0,
    content: 'LAST LOADED MESSAGE loaded more messages',
    channel_id: '998637045327081502',
    author: user3,
    attachments: [
      {
        id: '1042878162901672048',
        filename: 'flowchart-for-new-permissions.png',
        size: 981134,
        url: 'https://cdn.discordapp.com/attachments/697138785317814292/1042878162901672048/flowchart-for-new-permissions.png',
        proxy_url: 'https://media.discordapp.net/attachments/697138785317814292/1042878162901672048/flowchart-for-new-permissions.png',
        width: 8576,
        height: 5074,
        content_type: 'image/png'
      }
    ],
    reactions: [
      {
        count: 5,
        me: false,
        emoji: {
          id: null,
          name: '✅'
        }
      }
    ],
    embeds: [],
    mentions: [],
    mention_roles: [],
    pinned: false,
    mention_everyone: false,
    tts: false,
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    edited_timestamp: '2022-11-18T02:10:11.977000+00:00',
    flags: 2,
    components: [],
    webhook_id: '998882498719273090',
    message_reference: {
      channel_id: '1',
      guild_id: '2',
      message_id: '1042878163170119741'
    }
  },
  {
    author: user2,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'loaded more messages:',
    id: 'wwqeewqww',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'loaded more messages messagesmore messagesmore messagesmore messagesmore messagesmore messages',
    id: 'wwqeewq',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: null,
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user2,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content:
      "loaded more messages  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 'weqweadfasfa3q12',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content:
      "FIRST LOADED MESSAGE  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 'wwqeewq',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  }
];

export const staticMessages: APIMessage[] = [
  {
    id: '1042882684902453278',
    type: 0,
    content:
      "LAST MESSAGE 🔓 **__Upcoming Change for Command Permissions__** 🔐 Based on feedback, we're making some updates to permissions for application commands to simplify permission management and to make command permissions more closely resemble other permissions systems in Discord. Server admins can begin to opt-in to the command permission changes outlined in the change log on a per-server basis **starting on December 16, 2022**. However, changes will not be applied to all servers **until late January or early February**. > **📰 Change log: <http://discord.com/developers/docs/change-log#upcoming-application-command-permission-changes>**. This includes many more context and details about whether you'll be affected + how to update your app accordingly. > <:SystemMessageWarn:842172192401915971>﻿ Most apps will be unaffected by this change, but **if your app uses the `PUT /applications/<application_id>/guilds/<guild_id>/commands/<command_id>/permissions` endpoint, you may need to make updates.** There are two main changes included: **1️⃣ The logic used to apply permission configurations to a user in a given context within Discord clients.** The new command permissions configuration behavior allows command-level permissions, app-level permissions, and `default_member_permissions` to work together rather than independently. - `default_member_permissions` acts as a “default” that a developer can set when creating or updating a command - App-level permission configurations (typically set by admins) now act as the 'base' configuration - Command-level permission configurations (typically set by admins) now act as an “override” of the app-level **2️⃣ A new `APPLICATION_COMMAND_PERMISSIONS_V2` guild feature flag to indicate whether that guild is using the old permissions logic or the new (upcoming) logic.** And now....a flowchart to help understand and visualize *how* permissions configurations are used by Discord clients *(it's huge, so you might want to click 'Open Original' to see all of it)*",
    channel_id: '998637045327081502',
    author: {
      bot: true,
      id: '998882498719273090',
      username: 'Discord Developers #api-announcements',
      avatar: '0ad0ccf2bc8dffbaddcf39825c4b5706',
      discriminator: '0000'
    },

    attachments: [
      {
        id: '1042878162901672048',
        filename: 'flowchart-for-new-permissions.png',
        size: 981134,
        url: 'https://cdn.discordapp.com/attachments/697138785317814292/1042878162901672048/flowchart-for-new-permissions.png',
        proxy_url: 'https://media.discordapp.net/attachments/697138785317814292/1042878162901672048/flowchart-for-new-permissions.png',
        width: 8576,
        height: 5074,
        content_type: 'image/png'
      }
    ],
    // attachments: [
    //   {
    //     id: '1042878162901672048',
    //     filename: 'flowchart-for-new-permissions.png',
    //     size: 981134,
    //     url: 'https://cdn.discordapp.com/attachments/697138785317814292/1042878162901672048/flowchart-for-new-permissions.png',
    //     proxy_url:
    //       'https://media.discordapp.net/attachments/697138785317814292/1042878162901672048/flowchart-for-new-permissions.png',
    //     width: 8576,
    //     height: 5074,
    //     content_type: 'image/png'
    //   }
    // ],
    reactions: [
      {
        count: 5,
        me: false,
        emoji: {
          id: null,
          name: '✅'
        }
      }
    ],
    embeds: [],
    mentions: [],
    mention_roles: [],
    pinned: false,
    mention_everyone: false,
    tts: false,
    timestamp: '2022-11-17T19:23:27.904000+00:00',

    edited_timestamp: '2022-11-18T02:10:11.977000+00:00',
    flags: 2,
    components: [],
    webhook_id: '998882498719273090',
    message_reference: {
      channel_id: '1',
      guild_id: '2',
      message_id: '1042878163170119741'
    }
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages  :skull:',
    id: '766867fe17-4485-83cf-5ec5ea1d2dce',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: null,
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '4d794d8f-737c-4ec6-bb9f-fc3cef4f2846',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user2,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '1027271f-a770-4a0f-94b9-e99aebba8b4b',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '2164b53f-3a33-48ee-94bb-3d9d5549d642',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also  including versions of Lorem Ipsum.",
    id: '-a578-49aa-9cc0-53a73588b0b4',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '6208413e-101a-4172-be69-33305400c23a',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user2,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'fb634b7d-5f07-420c-b2e6-060ba8f1ace6',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '03c57982-28c1-4110-a177-ade477228548',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '14085fd0-4123-4719-beea-994fe6af4731',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user2,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'fc977aa5-a251-45a7-b479-ef408de829ac',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user2,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '3d028825-b311-4caa-ba66-0ff8137343a6',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '65896e40-74ed-4d44-9fbb-782efa48dafc',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '6051d0b8-91c8-4203-bd61-bb32c64ee1f4',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '33aa6c2c-65bb-4c8e-ae64-d4970de4646b',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '5dacc3cb-0dc2-48b4-be4d-a6d220f9e6a5',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '37f19444-aadd-4393-b727-1903dc24fbd7',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '092069e8-1495-4149-8da0-ba02bfc8d1ef',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '9a0f6646-6150-4703-9570-be37c49a6887',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'aad03ac5-f2a6-4748-aa4b-c3498fbd6ced',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '883fe86d-b5a7-4406-8fd4-fbfa257d9971',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'a463bb33-4471-48ab-ade7-dd97b961b971',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '5a6eac00-df34-42e4-a1f8-bdec09524ea8',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content:
      'more messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messages messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messagesmore messages',
    id: '5fb650ec-be60-426c-8757-11b9563aaf29',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'dc9ae802-b689-4ee2-b5a4-e4a0a3d42015',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'daa30f61-d1ad-4861-a813-0bf9f1503adc',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '7a724581-457d-467f-bbfe-3dd610cc265a',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '619d72cb-fe2d-4723-b7fa-99bbbd4f3eac',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'fb872820-0fb7-4ae8-80cc-9d4727478162',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '5c938ef0-3975-4582-a5d1-c49bb422cd9d',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: '82543222-1b8f-4d28-8851-003e68765c87',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'a0891a00-e513-4fb9-9262-f48a9c3381cf',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'more messages',
    id: 'ad069bf5-3e87-4644-8fac-45e04565d05a',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  },
  {
    author: user1,
    attachments: [],
    channel_id: 'wqeqwdsa',
    content: 'FIRST MESSAGE',
    id: '0828f670-9250-439b-af48-2fbcb5738608',
    embeds: [],
    timestamp: '2022-11-17T19:23:27.904000+00:00',
    mentions: [],
    stickers: [],
    edited_timestamp: '213124123ew12',
    tts: false,
    mention_everyone: false,
    mention_roles: [],
    pinned: false,
    type: MessageType.Default
  }
];
