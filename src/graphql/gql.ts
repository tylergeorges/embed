/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      channels {\n        id\n        name\n        type\n        position\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n':
    types.GuildDocument
};

export function graphql(
  source: '\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      channels {\n        id\n        name\n        type\n        position\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n'
): typeof documents['\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      channels {\n        id\n        name\n        type\n        position\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n'];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
