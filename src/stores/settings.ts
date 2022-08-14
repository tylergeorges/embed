import localforage from "localforage";
import { action, observable } from "mobx";

export class SettingsStore {
  @observable sendButton = false
  @observable messageViewRewriteEnabled = false

  constructor() {
    (async () => {
      this.sendButton = await localforage.getItem('sendButton')
      this.messageViewRewriteEnabled = await localforage.getItem('messageViewRewriteEnabled')
    })().catch(() => console.log('WidgetBot: localStorage is inaccessible so cannot load settings'))
  }

  @action setSendButton(enabled: boolean) {
    this.sendButton = enabled
    localforage.setItem('sendButton', enabled)
  }

  @action setMessageViewRewriteEnabled(enabled: boolean) {
    this.messageViewRewriteEnabled = enabled
    localforage.setItem('messageViewRewriteEnabled', enabled)
  }
}

export const settingsStore = new SettingsStore();
