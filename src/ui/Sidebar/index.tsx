import Channels from './Channels'
import Chats from './Chats'
import {Root, Close, ViewSwitcher, Button} from './elements'
import { Header } from './Header'
import Panel from './Panel'
import {observer} from 'mobx-react'
import {store} from '@models'
import { useState } from 'react'
import { useRouter } from '@hooks'
import { authStore, generalStore } from '@store'

enum Views {
    Channels,
    Chats
}

const Sidebar = observer(() => {
    const { channel } = useRouter()
    const [view, setView] = useState(channel?.startsWith('@') && authStore.user ? Views.Chats : Views.Channels)

    return <Root visible={store.sidebar.isOpen} className="sidebar">
        <Header />
        {generalStore.settings?.directEnabled && authStore.user && <ViewSwitcher>
            <Button selected={view === Views.Channels} onClick={() => setView(Views.Channels)}>Channels</Button>
            <Button selected={view === Views.Chats} onClick={() => setView(Views.Chats)}>Chats</Button>
        </ViewSwitcher>}
        <Channels visible={view === Views.Channels} />
        <Chats visible={view === Views.Chats} />
        <Panel />
    </Root>
});


export default Sidebar
