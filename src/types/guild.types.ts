import { Channel } from '@graphql/graphql';
import { APIChannel } from 'discord-api-types/v10';

// These are used to resolve type errors

export type APIDiscordChannel = APIChannel & {
  name: string;
  threads?: GqlChannel[];
  topic?: string;
  canSend: boolean;
};

export type GqlChannel = Channel & {
  name: string;
  canSend: boolean;
  threads?: GqlThread[];
  topic?: string;
};

export type GuildChannels = {
  [channelId: string]: GqlChannel | APIDiscordChannel;
};

export interface GqlThread extends GqlChannel {
  id: string;
  name: string;
  __typename: 'ThreadChannel';
}
