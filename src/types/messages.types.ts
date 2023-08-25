import { BaseMessageFragment, Message, UpdatedMessage } from '@graphql/graphql';

export type StateMessages = BaseMessageFragment | UpdatedMessage;

export interface MessagesQuery {
  channelV2: {
    id: string;
    __typename: 'TextChannel';
    messageBunch: {
      __typename: 'MessageBunch';
      messages: Message[];
    };
  };
}
