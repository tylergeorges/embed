/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n':
    types.GuildDocument,
  '\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n':
    types.MessageFragmentFragmentDoc,
  '\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...MessageFragment\n          }\n        }\n      }\n    }\n  }\n\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n':
    types.MessagesQueryDocument
};

export function graphql(
  source: '\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n'
): typeof documents['\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n'];
export function graphql(
  source: '\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'
): typeof documents['\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'];
export function graphql(
  source: '\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...MessageFragment\n          }\n        }\n      }\n    }\n  }\n\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'
): typeof documents['\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...MessageFragment\n          }\n        }\n      }\n    }\n  }\n\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any>
  ? TType
  : never;
