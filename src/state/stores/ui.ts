import { Action, action } from 'easy-peasy';

export interface UIStore {
  // State
  initChannelYPos: number;
  currentChannelYPos: number;
  isMembersListOpen: boolean;
  isChannelsListOpen: boolean;

  // Actions
  setIsChannelsListOpen: Action<UIStore, boolean>;
  setIsMembersListOpen: Action<UIStore, boolean>;
  setCurrentChannelYPos: Action<UIStore, number>;
  setInitChannelYPos: Action<UIStore, number>;
}

const ui: UIStore = {
  // State
  isChannelsListOpen: true,
  isMembersListOpen: true,
  // Used for when we collapse and open categories drop down
  // to return active background component to original spot
  initChannelYPos: 0,
  currentChannelYPos: 0,

  // Actions
  setIsChannelsListOpen: action((state, payload) => {
    state.isChannelsListOpen = payload;
  }),

  setIsMembersListOpen: action((state, payload) => {
    state.isMembersListOpen = payload;
  }),

  // Set the current channel's Y position, this is used for the
  // ActiveBackground component
  setCurrentChannelYPos: action((state, payload) => {
    state.currentChannelYPos = payload;
    // state.initChannelYPos = payload;
  }),

  // Set initial channel Y position used for when we open
  // and close a category
  setInitChannelYPos: action((state, payload) => {
    state.initChannelYPos = payload;
  })
};

export default ui;
