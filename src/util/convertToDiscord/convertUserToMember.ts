import { MemberFragment } from '@graphql/graphql';
import { APIGuildMember, GuildMemberFlags } from 'discord-api-types/v10';

export function convertUserToMember(user: MemberFragment): APIGuildMember | null {
  if (!user) return null;

  return {
    flags: user.flags ?? GuildMemberFlags.CompletedOnboarding,
    mute: false,
    deaf: false,
    joined_at: '',
    roles: user.roles ?? [],
    avatar: user.avatarUrl
  };
}
