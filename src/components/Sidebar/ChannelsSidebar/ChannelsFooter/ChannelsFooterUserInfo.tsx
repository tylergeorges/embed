import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { LogoutButton } from '@icons/Buttons/LogoutButton';
import { useStoreState } from '@state';
import { useTranslation } from 'react-i18next';

export const ChannelsFooterUserInfo = () => {
  const user = useStoreState(state => state.user.data);
  const translate = useTranslation();

  if (!user) return <></>;

  const showDiscrim = user.provider === 'Discord' && user.discriminator !== '0';
  const showLogout = user.provider !== 'Guild';

  return (
    <Styles.ChannelsFooterUserWrapper>
      <Styles.ChannelsFooterUserAvatar
        src={user.avatarUrl}
        width={32}
        height={32}
        alt={translate.t('avatar.alt.label', {
          USERNAME: user.username
        })}
      />

      <Styles.ChannelsFooterUserContentWrapper>
        <Styles.ChannelsFooterUserName>{user.username}</Styles.ChannelsFooterUserName>

        {showDiscrim && (
          <Styles.ChannelsFooterUserDiscrim>#{user.discriminator}</Styles.ChannelsFooterUserDiscrim>
        )}
      </Styles.ChannelsFooterUserContentWrapper>

      {showLogout && <LogoutButton />}
    </Styles.ChannelsFooterUserWrapper>
  );
};
