import localforage from "localforage";
import { action, observable } from "mobx";

export class SettingsStore {
  @observable sendButton = false

  constructor() {
    (async () => {
      this.sendButton = await localforage.getItem('sendButton')
    })().catch(() => console.log('WidgetBot: localStorage is inaccessible so cannot load settings'))
  }

  @action setSendButton(enabled: boolean) {
    this.sendButton = enabled
    localforage.setItem('sendButton', enabled)
  }
}

export const settingsStore = new SettingsStore();
