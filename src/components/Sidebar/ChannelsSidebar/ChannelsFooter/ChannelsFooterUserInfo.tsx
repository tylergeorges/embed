import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { useStoreState } from '@state';

export const ChannelsFooterUserInfo = () => {
  const user = useStoreState(state => state.user.data);

  if (!user) return <></>;

  return (
    <Styles.ChannelsFooterUserWrapper>
      <Styles.ChannelsFooterUserAvatar
        src={user?.avatarUrl}
        width={32}
        height={32}
        alt={`@${user.username}'s Avatar.`}
      />

      <Styles.ChannelsFooterUserContentWrapper>
        <Styles.ChannelsFooterUserName>{user.username}</Styles.ChannelsFooterUserName>
        <Styles.ChannelsFooterUserDiscrim>#{user.discriminator}</Styles.ChannelsFooterUserDiscrim>
      </Styles.ChannelsFooterUserContentWrapper>
    </Styles.ChannelsFooterUserWrapper>
  );
};
