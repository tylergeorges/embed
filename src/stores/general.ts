import {action, autorun, observable} from "mobx";
import {GuildInfo_guild, Settings_guild_settings} from "@generated";
import {ICategory} from "@ui/Sidebar/Channels/categorise";

export class GeneralStore {
  @observable appName = 'WidgetBot';

  @observable needsUpdate: boolean = false;
  @observable loading?: boolean;
  @observable fetchGuild?: Function;
  @observable guild?: GuildInfo_guild;
  @observable settings?: Settings_guild_settings;
  @observable channels: ICategory[] = [];
  @observable menuOpen: boolean = false;

  constructor() {
    autorun(() => {
      if (this.needsUpdate) {
        this.fetchGuild?.();
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

  @action setSettings(settings: Settings_guild_settings) {
    this.settings = settings
  }

  @action setChannels(channels: ICategory[]) {
    this.channels = channels
  }
}

// export default new GeneralStore();
export const generalStore = new GeneralStore();
