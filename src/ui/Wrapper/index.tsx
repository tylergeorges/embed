import { Wrapper as Root } from './elements'
import { observer } from 'mobx-react'
import { store } from '@models'

const Wrapper = observer(({ children, hideOnMobile = false, threadFullscreen = true, showMemberList = false }) => (
  <Root
    onClick={() => {
      if (window.innerWidth < 520) {
        if (store.sidebar.isOpen) store.sidebar.toggle();
        if (store.memberlist.isOpen) store.memberlist.toggle();
      }
    }}
    squashed={store.sidebar.isOpen || store.memberlist.isOpen}
    hideOnMobile={hideOnMobile}
    threadFullscreen={threadFullscreen}
    className="wrapper"
  >
    {children}
  </Root>
))

export default Wrapper
