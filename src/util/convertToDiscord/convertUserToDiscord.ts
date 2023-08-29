import { UserFragment } from '@graphql/graphql';
import { APIUser } from 'discord-api-types/v10';
import { AuthUser } from 'types/user.types';

export function convertUserToDiscord(user: UserFragment | AuthUser): APIUser | null {
  if (!user) return null;

  return {
    global_name: 'username' in user ? user.username : user.name,
    id: user.id,
    username: 'username' in user ? user.username : user.name,
    discriminator: '',
    avatar: ''
  };
}
