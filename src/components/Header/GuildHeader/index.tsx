import { Header } from '@components/Header';
import * as Styles from '@components/Header/styles';
import { useCreateDiscordUrl } from '@hooks/useCreateDiscordUrl';
import { useStoreState } from '@state';

const formatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const GuildHeader = () => {
  const guild = useStoreState(state => state.guild.data);
  const { createGuildIconUrl } = useCreateDiscordUrl();

  if (!guild) return <></>;

  return (
    <Header>
      {guild.icon && (
        <Styles.GuildIcon
          src={createGuildIconUrl({ guildId: guild.id, icon: guild.icon })}
          alt="Guild Icon"
          width={26}
          height={26}
        />
      )}

      <Styles.GuildHeaderName>{guild.name}</Styles.GuildHeaderName>
      <Styles.GuildMemberCount>{formatter.format(guild.memberCount)}</Styles.GuildMemberCount>
    </Header>
  );
};
