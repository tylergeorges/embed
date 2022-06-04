import Channels from './Channels'
import Chats from './Chats'
import {Root, Close, ViewSwitcher, Button} from './elements'
import { Header } from './Header'
import Panel from './Panel'
import {observer} from 'mobx-react'
import {store} from '@models'
import { useEffect, useState } from 'react'
import { useRouter } from '@hooks'
import { authStore, generalStore } from '@store'

export enum Views {
    Channels,
    Chats
}

const Sidebar = observer(() => {
    useEffect(() => {
        const { channel } = useRouter()
        generalStore.setSidebarView(channel?.startsWith('@') && authStore.user ? Views.Chats : Views.Channels)
    }, [])

    return <Root visible={store.sidebar.isOpen} className="sidebar">
        <Header />
        {generalStore.settings?.directEnabled && authStore.user && <ViewSwitcher>
            <Button selected={generalStore.sidebarView === Views.Channels} onClick={() => generalStore.setSidebarView(Views.Channels)}>Channels</Button>
            <Button selected={generalStore.sidebarView === Views.Chats} onClick={() => generalStore.setSidebarView(Views.Chats)}>Chats</Button>
        </ViewSwitcher>}
        <Channels visible={generalStore.sidebarView === Views.Channels} />
        <Chats visible={generalStore.sidebarView === Views.Chats} />
        <Panel />
    </Root>
});


export default Sidebar
