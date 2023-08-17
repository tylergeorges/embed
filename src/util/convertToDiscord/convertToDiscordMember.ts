import { Mention } from '@graphql/graphql';
import { APIGuildMember, GuildMemberFlags } from 'discord-api-types/v10';

export function convertToDiscordMember(user: Mention): APIGuildMember {
  return {
    user: {
      id: user.id,
      username: user.name,
      global_name: user.name,
      avatar: null,
      discriminator: ''
    },
    nick: '',
    avatar: null,
    roles: [],
    joined_at: '',
    deaf: false,
    mute: false,
    flags: GuildMemberFlags.CompletedOnboarding
  };
}
