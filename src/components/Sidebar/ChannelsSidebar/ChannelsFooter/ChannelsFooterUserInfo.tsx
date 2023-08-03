import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { LogoutButton } from '@icons/Buttons/LogoutButton';
import { useStoreState } from '@state';

export const ChannelsFooterUserInfo = () => {
  const user = useStoreState(state => state.user.data);

  if (!user) return <></>;

  return (
    <Styles.ChannelsFooterUserWrapper>
      <div>
        <Styles.ChannelsFooterUserAvatar
          src={user?.avatarUrl}
          width={32}
          height={32}
          alt={`@${user.username}'s Avatar.`}
        />
      </div>

      <Styles.ChannelsFooterUserContentWrapper>
        <Styles.ChannelsFooterUserName>{user.username}</Styles.ChannelsFooterUserName>
        {user.provider === 'Discord' && (
          <Styles.ChannelsFooterUserDiscrim>#{user.discriminator}</Styles.ChannelsFooterUserDiscrim>
        )}
      </Styles.ChannelsFooterUserContentWrapper>

      <LogoutButton />
    </Styles.ChannelsFooterUserWrapper>
  );
};
