/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Guild {\n    guild(id: \"585454996800405509\") {\n      id\n    }\n  }\n": types.GuildDocument,
};

export function graphql(source: "\n  query Guild {\n    guild(id: \"585454996800405509\") {\n      id\n    }\n  }\n"): (typeof documents)["\n  query Guild {\n    guild(id: \"585454996800405509\") {\n      id\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;