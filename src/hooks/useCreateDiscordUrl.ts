interface GuildIconUrlArgs {
  guildId: string;
  icon: string;
}

export const useCreateDiscordUrl = () => {
  const createGuildIconUrl = ({ guildId, icon }: GuildIconUrlArgs) =>
    `https://cdn.discordapp.com/icons/${guildId}/${icon}.webp?size=64`;

  return { createGuildIconUrl };
};
