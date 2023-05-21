import { Channel, ChannelType } from '@graphql/graphql';

/** Sorts channels based on the channel type. */
export function positionChannel(channel: Channel) {
  return channel.type === ChannelType.GuildVoice ? channel.position + 500 : channel.position;
}
