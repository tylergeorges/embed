import { Server } from '@widgetbot/embed-api'

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

export default api
