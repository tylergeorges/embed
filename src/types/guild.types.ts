import { Channel } from '@graphql/graphql';
import { APIChannel } from 'discord-api-types/v10';

export type TAPIChannel = APIChannel & {
  name: string;
  threads?: TChannel[];
  topic?: string;
  canSend: boolean;
};

export type TChannel = Channel & {
  name: string;
  canSend: boolean;
  threads?: IThread[];
  topic?: string;
};

export type GuildChannels = {
  [channelId: string]: TChannel | TAPIChannel;
};

export interface IThread extends TChannel {
  id: string;
  name: string;
  __typename: 'ThreadChannel';
}
