export function getAvatarId(avatarUrl: string) {
  return avatarUrl.split('/').pop()?.split('.')[0] ?? null;
}

export function getIdFromUrl(avatarUrl: string) {
  const id = avatarUrl.split('/')[4] ?? null;

  return id;
}
