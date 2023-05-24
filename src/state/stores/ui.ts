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

  isCurrentChannelThread: boolean | undefined;
  isThreadsPanelOpen: boolean | undefined;

  isMembersListOpen: boolean;
  isChannelsListOpen: boolean;

  showTopicModal: boolean;
  showThreadsModal: boolean;

  showContextMenu: boolean;
  contextMenuData: ContextMenuData;

  // Actions
  setIsChannelsListOpen: Action<UIStore, boolean>;
  setIsMembersListOpen: Action<UIStore, boolean>;
  setIsCurrentChannelThread: Action<UIStore, boolean>;
  setIsThreadsPanelOpen: Action<UIStore, boolean>;

  setCurrentChannelYPos: Action<UIStore, number>;
  setInitChannelYPos: Action<UIStore, number>;

  setShowTopicModal: Action<UIStore, boolean>;
  setShowContextMenu: Action<UIStore, boolean>;
  setShowThreadsModal: Action<UIStore, boolean>;

  setContextMenuData: Action<UIStore, ContextMenuData>;
}

const ui: UIStore = {
  // State
  isChannelsListOpen: true,
  isThreadsPanelOpen: false,
  isMembersListOpen: false,

  isCurrentChannelThread: undefined,
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

  setIsMembersListOpen: action((state, payload) => {
    state.isMembersListOpen = payload;
    if (payload) {
      state.isThreadsPanelOpen = false;
    }
  }),
  setIsCurrentChannelThread: action((state, payload) => {
    state.isCurrentChannelThread = payload;
  }),
  setIsThreadsPanelOpen: action((state, payload) => {
    if (state.isCurrentChannelThread && payload) {
      state.isThreadsPanelOpen = true;
    } else {
      state.isThreadsPanelOpen = false;
    }
  }),
  setShowTopicModal: action((state, payload) => {
    state.showTopicModal = payload;
  }),

  setShowThreadsModal: action((state, payload) => {
    state.showThreadsModal = payload;
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
  }),
  setShowContextMenu: action((state, payload) => {
    state.showContextMenu = payload;
  }),
  setContextMenuData: action((state, payload) => {
    state.contextMenuData = payload;
  })
};

export default ui;
