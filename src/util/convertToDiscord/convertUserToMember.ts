import { MemberFragment } from '@graphql/graphql';
import { APIGuildMember } from 'discord-api-types/v10';

export function convertUserToMember(user: MemberFragment): APIGuildMember | null {
  if (!user) return null;

  return {
    flags: user.flags as number,
    mute: false,
    deaf: false,
    joined_at: '',
    roles: user.roles ?? [],
    avatar: user.avatarUrl,
    username: user.name,
    global_name: user.name
  };
}
