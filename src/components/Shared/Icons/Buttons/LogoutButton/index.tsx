import { IconButton } from '@icons/Buttons/IconButton';
import { useStoreActions } from '@state';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
  const translate = useTranslation();

  const setUserData = useStoreActions(state => state.user.setUserData);
  const setRefetchGuild = useStoreActions(state => state.guild.setRefetchGuild);

  const logout = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      localStorage.removeItem('token');
      setUserData(undefined);

      setRefetchGuild(true);
    },
    [setUserData, setRefetchGuild]
  );

  return (
    <IconButton
      tooltipPlacement="top"
      tooltipLabel={translate.t('logout.tooltip') as string}
      onClick={logout}
      icon="Logout"
      size="md"
      backgroundGlowSize="xl"
      backgroundGlowRadii="xxs"
    />
  );
};
