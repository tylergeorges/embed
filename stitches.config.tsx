import { ScaleValue, createStitches } from '@stitches/react';

export const commonComponentId = process.env.NODE_ENV === 'development' ? undefined : 'embed';

const stitches = createStitches({
  theme: {
    transitions: {
      /** 100ms */
      fastestDuration: '100ms',

      /** 200ms */
      fasterDuration: '200ms',

      /** 300ms */
      defaultDuration: '300ms',

      /** 500ms */
      longerDuration: '500ms',

      /** 1000ms */
      longestDuration: '1000ms',

      defaultTransform: 'transform $defaultDuration ease',
      defaultOpacity: 'opacity $defaultDuration ease',
      widthAndTransform: 'transform $defaultDuration ease, width $defaultDuration ease'
    },

    colors: {
      primary: 'rgba(255, 255, 255, 1.0)',
      primaryDark: '#72767d',

      primaryOpacity10: 'rgba(255, 255, 255, 0.1)',
      primaryOpacity20: 'rgba(255, 255, 255, 0.2)',
      primaryOpacity30: 'rgba(255, 255, 255, 0.3)',
      primaryOpacity40: 'rgba(255, 255, 255, 0.4)',
      primaryOpacity50: 'rgba(255, 255, 255, 0.5)',
      primaryOpacity60: 'rgba(255, 255, 255, 0.6)',
      primaryOpacity70: 'rgba(255, 255, 255, 0.7)',
      primaryOpacity80: 'rgba(255, 255, 255, 0.8)',
      primaryOpacity90: 'rgba(255, 255, 255, 0.9)',
      primaryOpacity100: 'rgba(255, 255, 255, 1.0)',

      backDrop: 'rgba(0,0,0,0.7)',

      textPrimary: '#FFFFFF',
      textMuted: '$primaryOpacity30',

      iconLighter: 'rgba(255, 255, 255, 0.3)',
      iconLight: 'rgb(181,186,193)',
      iconActive: '$primaryOpacity90',
      active: 'rgba(255, 255, 255, 0.9)',

      systemMessageDark: '#999999',
      interactiveNormal: '#dcddde',
      accent: '#5865f2',
      accentOpacity60: '#5865f299',

      background: '#313338',
      backgroundOpacity10: '#36393f1a',
      backgroundSecondary: '#2b2d31',
      backgroundSecondaryAlt: 'rgb(35, 36, 40)',
      backgroundTertiary: '#232428',

      modalBackground: 'rgb(49, 51, 56)',
      modalFooterBackground: 'rgb(43, 45, 49)',

      mentioned: 'rgba(250, 166, 26, 0.1)',
      mentionedHover: 'rgba(250, 168, 26, 0.08)',
      mentionedBorder: '#faa81a',

      inputBackground: 'rgb(30, 31, 34)',
      chatInputBackground: 'rgba(255,255,255,0.03)',

      contextMenuBackground: '#111214',
      messageHover: 'rgba(0, 0, 0, .05)',
      link: 'rgb(0, 168, 252)',

      tooltipBackground: '#18191c',
      tooltipForeground: '#dcddde',

      transparentBlack: 'rgba(0, 0, 0, 0.6)',
      blackSpoilerHover: 'rgba(0, 0, 0, 0.9)',
      spines: '#4f545c',
      borderDark: 'rgb(30, 31, 34)',
      danger: '#ed4245'
    },

    fonts: {
      main: 'Open Sans, sans-serif'
    },

    fontSizes: {
      /** font-size: 10px */
      xs: '10px',

      /** font-size: 12px */
      sm: '12px',

      /** font-size: 14px */
      md: '14px',

      /** font-size: 16px */
      lg: '16px',

      /** font-size: 20px */
      xl: '20px',

      /** font-size: 26px */
      xxl: '26px',

      /** font-size: 32px */
      xxxl: '32px'
    },

    space: {
      /** 0px */
      none: '0px',

      /** 2px */
      xxxs: '2px',

      /** 4px */
      xxs: '4px',

      /** 6px */
      xs: '6px',

      /** 8px */
      sm: '8px',

      /** 12px */
      md: '12px',

      /** 16px */
      lg: '16px',

      /** 24px */
      xl: '24px',

      /** 32px */
      xxl: '32px'
    },

    sizes: {
      /** 0px */
      none: '0px',

      /** 16px */
      xxs: '16px',

      /** 24px */
      xs: '24px',

      /** 56px */
      sm: '56px',

      /** 77px */
      md: '77px',

      /** 100px */
      lg: '100px',

      /** 112px */
      xl: '112px',

      /** 175px */
      xxl: '175px',

      /** 40px */
      iconSizeXl: '40px',

      /** 32px */
      iconSizeLg: '32px',

      /** 24px */
      iconSizeMd: '24px',

      /** 20px */
      iconSizeSm: '20px',

      /** 16px */
      iconSizeXs: '16px',

      /** 12px */
      iconSizeXxs: '12px',

      /** 32px */
      buttonHeightSm: '32px',

      /** 38px */
      buttonHeightMd: '38px',

      /** 16px */
      messageTypeIcon: '$iconSizeXs',

      /** 34px */
      threadButton: '34px',

      /** width: 240px */
      sideBarWidth: '240px',

      /** width: 8px */
      panelSeperatorWidth: '8px',

      /** min-width: 400px */
      threadPanelMinWidth: '400px',

      /** width: calc(100% - 16px) */
      channelNameWidth: 'calc(100% - 16px)',

      /** height: 32px */
      channelNameHeight: '32px',

      /** padding-left: 72px */
      messageLeftPadding: '72px',

      /** 44px */
      messageInputSize: '44px',

      /** height: 48px */
      headerHeight: '48px'
    },

    zIndices: {
      /** -1 */
      negative: -1,

      /** 0 */
      none: 0,

      /** 10 */
      tooltip: 10,

      /** 20 */
      membersSidebarBackdrop: 20,

      /** 30 */
      membersSidebar: 30,

      /** 40 */
      channelsSidebarBackdrop: 40,

      /** 50 */
      channelsSidebar: 50,

      /** 60 */
      modalBackdrop: 60,

      /** 70 */
      modal: 70
    },

    shadows: {
      dropShadow: 'rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
      headerDropShadow:
        '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)'
    },

    fontWeights: {
      /** font-weight: 400 */
      thin: 400,

      /** font-weight: 500 */
      medium: 500,

      /** font-weight: 600 */
      bold: 600
    },

    borderWidths: {
      /** border-width: 2px */
      spines: '2px'
    },

    radii: {
      /** border-radius: 3px */
      xxs: '3px',

      /** border-radius: 6px */
      xs: '6px',

      /** border-radius: 8px */
      sm: '8px',

      /** 1border-radius: 2px */
      md: '12px',

      /** border-radius: 16px */
      lg: '16px',

      /** border-radius: 24px */
      xl: '24px',

      /** border-radius: 32px */
      xxl: '32px',

      /** border-radius: 99999999999px */
      round: '99999999999px'
    }
  },

  media: {
    small: 'screen and (max-width: 768px)'
  },

  utils: {
    marginX: (value: ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value
    }),

    marginY: (value: ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value
    }),

    paddingX: (value: ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value
    }),

    paddingY: (value: ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value
    }),

    size: (value: ScaleValue<'sizes'>) => ({
      height: value,
      width: value
    })
  }
});

export const { theme, globalCss, keyframes, css, getCssText, styled } = stitches;
