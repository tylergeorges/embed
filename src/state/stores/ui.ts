import { Action, action } from 'easy-peasy';

interface ContextMenuData {
  xPos: number;
  yPos: number;
  channelLink?: string;
}

export interface UIStore {
  // State
  initChannelYPos: number;
  currentChannelYPos: number;

  isTransitionedThreadsPanelOpen: boolean | undefined;
  isDomThreadsPanelOpen: boolean | undefined;

  isChannelsListOpen: boolean;
  isThreadFullscreen: boolean;

  showTopicModal: boolean;
  showThreadsModal: boolean;
  showGuestFormModal: boolean;

  showContextMenu: boolean;
  contextMenuData: ContextMenuData;

  // Actions
  setIsChannelsListOpen: Action<UIStore, boolean>;

  setIsThreadFullscreen: Action<UIStore, boolean>;
  setIsDomThreadsPanelOpen: Action<UIStore, boolean>;
  setIsTransitionedThreadsPanelOpen: Action<UIStore, boolean>;

  setCurrentChannelYPos: Action<UIStore, number>;
  setInitChannelYPos: Action<UIStore, number>;

  setShowTopicModal: Action<UIStore, boolean>;
  setShowContextMenu: Action<UIStore, boolean>;
  setShowGuestFormModal: Action<UIStore, boolean>;
  setShowThreadsModal: Action<UIStore, boolean>;

  setContextMenuData: Action<UIStore, ContextMenuData>;
}

const ui: UIStore = {
  // State
  isChannelsListOpen: true,
  isDomThreadsPanelOpen: false,
  isTransitionedThreadsPanelOpen: false,
  isThreadFullscreen: false,

  showGuestFormModal: false,
  showTopicModal: false,
  showThreadsModal: false,
  contextMenuData: { xPos: 0, yPos: 0 },
  showContextMenu: false,

  // Used for when we collapse and open categories drop down
  // to return active background component to original spot
  initChannelYPos: 0,
  currentChannelYPos: 0,

  // Actions
  setIsChannelsListOpen: action((state, payload) => {
    state.isChannelsListOpen = payload;
  }),

  setIsThreadFullscreen: action((state, payload) => {
    state.isThreadFullscreen = payload;
  }),

  setIsDomThreadsPanelOpen: action((state, payload) => {
    if (payload) {
      state.isDomThreadsPanelOpen = true;
    } else {
      state.isDomThreadsPanelOpen = false;
    }
  }),

  setIsTransitionedThreadsPanelOpen: action((state, payload) => {
    if (payload) {
      state.isTransitionedThreadsPanelOpen = true;
    } else {
      state.isTransitionedThreadsPanelOpen = false;
    }
  }),

  setShowTopicModal: action((state, payload) => {
    state.showTopicModal = payload;
  }),

  setShowGuestFormModal: action((state, payload) => {
    state.showGuestFormModal = payload;
  }),

  setShowThreadsModal: action((state, payload) => {
    state.showThreadsModal = payload;
  }),

  // Set the current channel's Y position, this is used for the
  // ActiveBackground component
  setCurrentChannelYPos: action((state, payload) => {
    if (state.currentChannelYPos !== payload) {
      state.currentChannelYPos = payload;
    }
  }),

  // Set initial channel Y position used for when we open
  // and close a category
  setInitChannelYPos: action((state, payload) => {
    state.initChannelYPos = payload;
  }),

  setShowContextMenu: action((state, payload) => {
    state.showContextMenu = payload;
  }),

  setContextMenuData: action((state, payload) => {
    state.contextMenuData = payload;
  })
};

export default ui;
