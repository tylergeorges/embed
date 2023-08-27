import { authStore, generalStore } from '@store'
import { Server } from '@widgetbot/embed-api'
import { store } from '@models';

const queryParams = new URLSearchParams(location.search)

const api = new Server({ id: queryParams.get('api') ?? 'default' })

api.on('sendMessage', data => {
  if (typeof data === 'string') {
    // const channel = controller.state.activeChannel
    // controller.signals.sendMessage({ channel, message: data })
  } else if (
    data instanceof Object &&
    typeof data.channel === 'string' &&
    typeof data.message === 'string'
  ) {
    const { channel, message } = data
    // controller.signals.sendMessage({ channel, message })
  }
})

api.on('login', () => {
  if (authStore.user) return

  generalStore.settings?.guestMode ? generalStore.toggleMenu(true) : store.modal.openDiscordLogin()
})

api.on('logout', () => {
  authStore.logout()
})

api.on('setToken', token => {
  authStore.setToken(token);
});

api.emit('ready');

export default api
