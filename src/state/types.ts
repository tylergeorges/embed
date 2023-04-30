import { Action } from 'easy-peasy';
import { Category, Channel, GuildQuery } from '@graphql/graphql';

/** Namepsace with the types for the ui state. */
export namespace UiState {
  /** UiStore types */
  export interface Store {
    // State

    /** The Y coordinate of the current channel selected */
    currentChannelYPos: number;
    /** If the Members List should be opened or not
     *
     * True - Members List is opened
     *
     * False - Members List is closed
     */
    isMembersListOpen: boolean;

    /** If the Channels List should be opened or not
     *
     * True - Channels List  is opened
     *
     * False - Channels List is closed
     */
    isChannelsListOpen: boolean;
    /** Category we are rendering channels for. */
    /** All the categories for the guild. */
    guildCategories: Category[] | undefined;

    guildChannels: Channel[] | undefined;
    /** Data for the current guild. */
    guildData: (GuildQuery & { guildID: string; channelID: string }) | undefined;
    currentChannel: Channel | undefined;

    // Actions
    setIsChannelsListOpen: Action<Store, boolean>;
    setIsMembersListOpen: Action<Store, boolean>;
    setGuildData: Action<Store, GuildQuery & { guildID: string; channelID: string }>;
    // Pass object for initial render on route
    // Else we just pass a regular channel object
    setCurrentChannel: Action<Store, Channel>;
    setCurrentChannelYPos: Action<Store, number>;
  }
}

/** Namepsace with the types for the user state.  */
export namespace UserState {
  export interface IUser {
    id: string;
    username: string;
    discriminator: string;
    avatarUrl: string;
    provider: 'Guild' | 'Discord' | 'Guest';
  }

  /** UserStore types */
  export interface Store {
    data?: IUser;
    setUserData: Action<Store, IUser>;
    updateUserData: Action<Store, Partial<IUser>>;
  }
}
