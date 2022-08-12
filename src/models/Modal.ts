import { types } from 'mobx-state-tree'

export const Modal = types
  .model('Modal', {
    type: types.maybeNull(types.string),
    data: types.maybeNull(types.string),
    originalUrl: types.maybeNull(types.string),
    channel: types.maybeNull(types.string),
    thread: false,
    content: types.maybeNull(types.string),
    id: types.maybeNull(types.string),
    username: types.maybeNull(types.string),
    discrim: types.maybeNull(types.string),
    avatarUrl: types.maybeNull(types.string),
    bot: false,
    flags: types.maybeNull(types.number),
    guest: false,
    x: types.maybeNull(types.number),
    y: types.maybeNull(types.number),
    isOpen: false
  })
  .actions(self => ({
    openImage(url: string, originalUrl?: string) {
      self.isOpen = true
      self.type = 'image'
      self.data = url
      self.originalUrl = originalUrl
    },
    openSettings() {
      self.isOpen = true
      self.type = 'settings'
      self.data = null
    },
    openExperiments() {
      self.isOpen = true
      self.type = 'experiments'
      self.data = null
    },
    openTopic(topic, channel) {
      self.isOpen = true
      self.type = 'topic'
      self.data = topic
      self.channel = channel
    },
    openUpload(channel, thread, content) {
      self.isOpen = true
      self.type = 'upload'
      self.channel = channel
      self.thread = thread
      self.content = content
    },
    openProfile(id, username, discrim, avatarUrl, bot, flags, guest, x, y) {
      self.isOpen = true
      self.type = 'profile'
      self.id = id
      self.username = username
      self.discrim = discrim
      self.avatarUrl = avatarUrl
      self.bot = bot
      self.flags = flags
      self.guest = guest
      self.x = x
      self.y = y
    },
    openNewChat() {
      self.isOpen = true
      self.type = 'newchat'
    },
    close() {
      self.isOpen = false
    }
  }))
