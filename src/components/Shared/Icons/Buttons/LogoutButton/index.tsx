import { IconButton } from '@icons/Buttons/IconButton';
import { useStoreActions } from '@state';
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
  const translate = useTranslation();
  const setUserData = useStoreActions(state => state.user.setUserData);

  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setUserData(undefined);
    localStorage.removeItem('token');
  };

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
