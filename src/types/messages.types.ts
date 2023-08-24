import { BaseMessageFragment, Message, UpdatedMessage } from '@graphql/graphql';
import { APIMessage } from 'discord-api-types/v10';

export type StateMessages = BaseMessageFragment | UpdatedMessage;

export type ExpandedAPIMessage = APIMessage & { isGuest: boolean };

export interface MessagesQuery {
  channel: {
    id: string;
    __typename: 'TextChannel';
    messageBunch: {
      __typename: 'MessageBunch';
      messages: Message[];
    };
  };
}
