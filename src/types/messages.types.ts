import { BaseMessageFragment, UpdatedMessage } from '@graphql/graphql';
import { APIMessage } from 'discord-api-types/v10';

export type StateMessages = BaseMessageFragment | UpdatedMessage;

export type ExpandedAPIMessage = APIMessage & { isGuest: boolean };
