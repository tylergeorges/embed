export function getAvatarId(avatarUrl: string) {
  return avatarUrl.split('/').pop()?.split('.')[0] ?? null;
}
