import { Channel, ThreadChannel } from '@graphql/graphql';
import { APIChannel } from 'discord-api-types/v10';

// These are used to resolve type errors

export type APIDiscordChannel = APIChannel & {
  name: string;
  threads?: ThreadChannel[];
  topic?: string;
  canSend: boolean;
};

export type GuildChannels = {
  [channelId: string]: Channel | APIDiscordChannel;
};
