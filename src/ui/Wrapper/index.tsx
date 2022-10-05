import { Wrapper as Root } from './elements'
import { observer } from 'mobx-react'
import { store } from '@models'

const Wrapper = observer(({ children, hideOnMobile = false, threadFullscreen = true, groupChatOpen = false }) => (
  <Root
    onClick={() => {
      if (window.innerWidth < 520) {
        if (store.sidebar.isOpen) store.sidebar.toggle();
        if (store.memberlist.isOpen) store.memberlist.toggle();
      }
    }}
    sidebarOpen={store.sidebar.isOpen}
    memberListOpen={store.memberlist.isOpen && groupChatOpen}
    hideOnMobile={hideOnMobile}
    threadFullscreen={threadFullscreen}
    className="wrapper"
  >
    {children}
  </Root>
))

export default Wrapper
