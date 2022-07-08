import Channels from './Channels'
import Chats from './Chats'
import {Root, ViewSwitcher, Button} from './elements'
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
    const { channel } = useRouter()

    useEffect(() => {
        generalStore.setSidebarView(channel?.startsWith('@') && authStore.user ? Views.Chats : Views.Channels)
    }, [])

    return <Root visible={store.sidebar.isOpen} className="sidebar">
        <Header />
        {generalStore.settings?.directEnabled && authStore.user && <ViewSwitcher>
            <Button selected={generalStore.sidebarView === Views.Channels} onClick={() => generalStore.setSidebarView(Views.Channels)}>Channels</Button>
            <Button selected={generalStore.sidebarView === Views.Chats} onClick={() => generalStore.setSidebarView(Views.Chats)}>Chats</Button>
        </ViewSwitcher>}
        {generalStore.sidebarView === Views.Channels ? <Channels /> : null}
        {generalStore.sidebarView === Views.Chats && generalStore.guild ? <Chats /> : null}
        <Panel />
    </Root>
});


export default Sidebar
