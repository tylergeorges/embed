import { ScaleValue, createStitches } from '@stitches/react';

const stitches = createStitches({
  theme: {
    colors: {
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
      primary: 'rgba(255, 255, 255, 1.0)',
      primaryDark: '#72767d',

      textPrimary: '#FFFFFF',
      textMuted: 'rgba(255, 255, 255, 0.3)',

      iconDark: 'rgba(255, 255, 255, 0.3)',
      iconLight: 'rgb(181,186,193)',
      iconActive: '$primaryOpacity90',

      systemMessageDark: '#999999',
      interactiveNormal: '#dcddde',
      accent: '#5865f2',
      accentOpacity60: '#5865f299',

      background: '#313338',
      backgroundOpacity10: '#36393f1a',
      backgroundSecondary: '#2b2d31',
      backgroundSecondaryAlt: '#232428',
      backgroundTertiary: '#232428',

      inputBackground: 'rgba(255, 255, 255, 0.03)',

      contextMenuBackground: '#111214',
      messageHover: 'rgba(0, 0, 0, .05)',
      link: '#00b0f4',
      mentioned: 'rgba(250, 166, 26, 0.1)',
      mentionedHover: 'rgba(250, 168, 26, 0.08)',
      mentionedBorder: '#faa81a',
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

      /** font-size: 32px */
      xxl: '32px'
    },
    space: {
      /** 0px */
      none: '0px',

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
      /** 30px */
      iconSizeLarge: '30px',
      /** 20px */
      iconSizeSmall: '20px',
      /** 24px */
      iconSizeMed: '24px',
      /** 36px */
      iconSizeXl: '36px',
      /** 16px */
      messageTypeIcon: '16px',

      /** 34px */
      threadButton: '34px',
      /** width: 200px */
      sideBarWidth: '200px',
      /** min-width: 200px */
      threadPanelMinWidth: '400px',

      /** width: calc(100% - 16px) */
      channelNameWidth: 'calc(100% - 16px)',
      /** height: 32 */
      channelNameHeight: '32px',

      /** padding-left: 72px */
      messageLeftPadding: '72px',

      /** 44px */
      messageInputSize: '44px',
      /** height: 48px */
      headerHeight: '48px'
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
      /** border-radius: 4px */
      xxs: '4px',

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
    },
    singleChannel: {
      enable: false
    },
    url: {
      height: 0
    },
    readOnly: {
      enable: false
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
