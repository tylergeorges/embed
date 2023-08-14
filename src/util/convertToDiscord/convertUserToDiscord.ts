/* eslint-disable no-underscore-dangle */

import { Mention } from '@graphql/graphql';
import { getAvatarId } from '@util/convertToDiscord/getAvatarId';
import { APIUser } from 'discord-api-types/v10';
import { AuthUser } from 'types/user.types';

export function convertUserToDiscord(user: AuthUser | Mention): APIUser {
  return {
    global_name: 'name' in user ? user.name : user.username,
    // TODO: change to use regular 'id' instead of _id once change goes live.
    id: '_id' in user ? user._id : user.id,
    username: 'name' in user ? user.name : user.username,
    discriminator: '',
    avatar: 'avatarUrl' in user ? getAvatarId(user.avatarUrl) : ''
  };
}
