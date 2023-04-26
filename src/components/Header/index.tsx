import { Root, SingleChannel, Inner } from './elements';
import Hamburger from './Hamburger';
// import { Header as ServerInfo } from '../Sidebar/Header'
interface Props {
  children: any;
  thread?: boolean;
}

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

export default Header;

export * from './elements';
