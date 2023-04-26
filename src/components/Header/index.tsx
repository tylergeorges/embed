 nextjs-paths
import { styled, css, theme } from '@stitches';

import { Root, SingleChannel, Inner } from './elements';
import Hamburger from './Hamburger';
// import { Header as ServerInfo } from '../Sidebar/Header'
interface Props {
  children: any;
  thread?: boolean;
}
 nextjs-container

const Header = ({ children, thread = false }: Props) => (
  <Root className="header">
    <SingleChannel>{/* <ServerInfo /> */}</SingleChannel>
    <Inner>
      <Hamburger
        onClick={e => {
          e.stopPropagation();
          // thread
          //   ? generalStore.clearThread()
          //   : store.sidebar.toggle();
        }}
        // open={store.sidebar.isOpen}
        thread={thread}
      />
      {children}
    </Inner>
  </Root>
);

 nextjs-paths
export const SingleChannel = styled(
  'div',
  'single-channel',
  css({
    [`& ${theme.singleChannel.enable}`]: {
      display: 'none'
    }
  })
);

export const Inner = styled(
  'div',
  'inner',
  css({
    display: 'flex',
    flexShrink: '1',
    flexGrow: 1,
    minWidth: 0,
    height: '47px',
    padding: '10px 0',
    '@media (max-width: 270px), (max-height: 300px)': {
      height: '41px',
      padding: '7px 0'
    }
  })
);

export const Stretch = styled(
  'div',
  'stretch',
  css({
    diplay: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    flexShrink: 1,
    width: 0
  })
);

export default Header;

export * from './elements';
 nextjs-container
