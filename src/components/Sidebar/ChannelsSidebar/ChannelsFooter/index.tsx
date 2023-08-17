import * as Styles from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/styles';
import { useStoreState } from '@state';
import { ChannelsFooterUserInfo } from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/ChannelsFooterUserInfo';
import { ChannelsFooterLoginButton } from '@components/Sidebar/ChannelsSidebar/ChannelsFooter/ChannelsFooterLoginButton';
import { version } from '../../../../../package.json';

export const ChannelsFooter = () => {
  const user = useStoreState(state => state.user.data);

  return (
    <Styles.ChannelsFooterWrapper>
      {user ? <ChannelsFooterUserInfo /> : <ChannelsFooterLoginButton />}

      <Styles.ChannelsFooterVersionWrapper>
        WidgetBot v{version}
      </Styles.ChannelsFooterVersionWrapper>
    </Styles.ChannelsFooterWrapper>
  );
};
