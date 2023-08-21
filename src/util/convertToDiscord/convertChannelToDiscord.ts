import { Channel } from '@graphql/graphql';
import { APIChannel, APIThreadChannel, ChannelType } from 'discord-api-types/v10';

export function convertChannelToDiscord(
  channel: Channel & { parentId?: string }
): APIChannel | APIThreadChannel {
  if ('parentId' in channel) {
    return {
      id: channel.id,
      name: channel.name,
      position: channel.position,
      type: channel.type === 'PublicThread' ? ChannelType.PublicThread : ChannelType.PrivateThread,
      parent_id: channel.parentId as string,
      applied_tags: []
    } as APIThreadChannel;
  }

  return {
    id: channel.id,
    name: channel.name,
    position: channel.position,
    // @ts-expect-error
    // Enum from GQL doesnt match Discords Enums
    type: channel.type
  };
}
