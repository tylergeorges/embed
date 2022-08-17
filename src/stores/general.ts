import {action, autorun, observable} from "mobx";
import { Chats, Chats_getChats, GuildInfo_guild, Message, Message_thread, Settings_settings } from "@generated";
import {ICategory} from "@ui/Sidebar/Channels/categorise";
import { EmojiStore } from "@services/Emoji";
import { defaultEmojis } from "@services/Emoji/defaultEmojis";
import { Views } from "@ui/Sidebar";
import { MessageDataModified } from "@ui/Messages/Message";

export class GeneralStore {
  @observable appName = 'WidgetBot';

  @observable needsUpdate: boolean = false;
  @observable loading?: boolean;
  @observable fetchGuild?: Function;
  @observable guild?: GuildInfo_guild;
  @observable settings?: Settings_settings;
  @observable channels: ICategory[] = [];
  @observable menuOpen: boolean = false;
  @observable activeThread?: Omit<Message_thread, '__typename'>;
  @observable threadFullscreen: boolean = false;
  @observable file?: File;
  @observable emojis = new EmojiStore(...defaultEmojis);
  @observable pins?: Message[];
  @observable pinsOpen: boolean = false;
  @observable chats: Omit<Chats_getChats, '__typename'>[];
  @observable sidebarView: Views;
  @observable messageToDelete?: MessageDataModified;
  @observable unreadChannels = new Set<string>();

  constructor() {
    autorun(() => {
      if (this.needsUpdate) {
        this.fetchGuild?.();
        this.setChats(null);
        this.needsUpdate = false;
      }
    })
  }

  @action toggleMenu(res: boolean = this.menuOpen) {
    this.menuOpen = res
  }

  @action setGuild(guild: GuildInfo_guild) {
    this.guild = guild
  }

  @action setSettings(settings: Settings_settings) {
    this.settings = settings
  }

  @action setChannels(channels: ICategory[]) {
    this.channels = channels
  }

  @action setActiveThread(data: Omit<Message_thread, '__typename'>) {
    this.activeThread = data;
  }

  @action setThreadFullscreen(fullscreen: boolean) {
    this.threadFullscreen = fullscreen;
  }

  @action clearThread() {
    // TODO: Set activeThread to null - this is for testing
    this.activeThread = null;
    this.threadFullscreen = false;
  }

  @action setFile(file: File) {
    this.file = file;
  }

  @action setEmojis(emojis: EmojiStore) {
    this.emojis = emojis;
  }

  @action setPins(pins: Message[]) {
    this.pins = pins;
  }

  @action togglePins(res: boolean = !this.pinsOpen) {
    this.pinsOpen = res
  }

  @action setChats(chats: Omit<Chats_getChats, '__typename'>[]) {
    this.chats = chats;
  }

  @action setSidebarView(view: Views) {
    this.sidebarView = view;
  }

  @action setMessageToDelete(msg: MessageDataModified) {
    this.messageToDelete = msg
  }

  @action addUnreadChannel(channel: string) {
    this.unreadChannels.add(channel)
  }

  @action readChannel(channel: string) {
    this.unreadChannels.delete(channel)
  }
}

// export default new GeneralStore();
export const generalStore = new GeneralStore();
