import { Wrapper as Root } from './elements'
import { observer } from 'mobx-react'
import { store } from '@models'

const Wrapper = observer(({ children, hideOnMobile = false, threadFullscreen = true, showMemberList = false }) => (
  <Root
    onClick={() => {
      if (store.sidebar.isOpen && window.innerWidth < 520) {
        store.sidebar.toggle()
      }
    }}
    squashed={store.sidebar.isOpen}
    memberListOpen={showMemberList && store.memberlist.isOpen}
    hideOnMobile={hideOnMobile}
    threadFullscreen={threadFullscreen}
    className="wrapper"
  >
    {children}
  </Root>
))

export default Wrapper
