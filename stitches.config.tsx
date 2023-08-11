import { ScaleValue, createStitches } from '@stitches/react';

export const commonComponentId = process.env.NODE_ENV === 'development' ? undefined : 'embed';

const stitches = createStitches({
  theme: {
    transitions: {
      fastestDuration: '100ms',
      fasterDuration: '200ms',
      defaultDuration: '300ms',
      longerDuration: '500ms',

      defaultTransform: 'transform $defaultDuration ease',
      defaultOpacity: 'opacity $defaultDuration ease',
      widthAndTransform: 'transform $defaultDuration ease, width $defaultDuration ease'
    },

    colors: {
      saturationFactor: '1',

      headerPrimaryHsl: '220 calc($saturationFactor * 13%) 95.5%',
      headerPrimary: 'hsl($headerPrimaryHsl / 1)',

      channelsPrimaryHsl: '214 calc($saturationFactor * 8.1%) 61.2%',
      channelsPrimary: 'hsl($channelsPrimaryHsl / 1)',

      textPrimaryHsl: '210 calc($saturationFactor * 9.1%) 87.1%',
      textPrimary: 'hsl($textPrimaryHsl / 1)',

      textMutedHsl: '214 calc($saturationFactor * 8.1%) 61.2%',
      textMuted: 'hsl($textMutedHsl / 1)',

      primaryDark: '#72767d',

      backgroundHsl: '223 calc($saturationFactor * 6.7%) 20.6%',
      background: 'hsl($backgroundHsl / 1)',

      backgroundSecondaryHsl: '220 calc($saturationFactor * 6.5%) 18%',
      backgroundSecondary: 'hsl($backgroundSecondaryHsl / 1)',

      backgroundSecondaryAltHsl: '228 calc($saturationFactor * 6.7%) 14.7%',
      backgroundSecondaryAlt: 'hsl($backgroundSecondaryAltHsl / 1)',

      backgroundTertiaryHsl: '225 calc($saturationFactor * 6.3%) 12.5%',
      backgroundTertiary: 'hsl($backgroundTertiaryHsl / 1)',

      backgroundModifierSelectedHsl: '228 calc($saturationFactor * 6%) 32.5%',
      backgroundModiferSelected: 'hsl($backgroundModifierSelectedHsl / 0.6)',

      backgroundModifierHoverHsl: '223 calc($saturationFactor * 5.8%) 52.9%',
      backgroundModifierHover: 'hsl($backgroundModifierHoverHsl / 0.16)',

      modalBackgroundHsl: '223 calc($saturationFactor * 6.7%) 20.6%',
      modalBackground: 'hsl($modalBackgroundHsl / 1)',

      interactiveActiveHsl: '0 calc($saturationFactor * 0%) 100%',
      interactiveActive: 'hsl($interactiveActiveHsl / 1)',

      interactiveDefaultHsl: '215 calc($saturationFactor * 8.8%) 73.3%',
      interactiveDefault: 'hsl($interactiveDefaultHsl / 1)',

      interactiveHoverHsl: '210 calc($saturationFactor * 9.1%) 87.1%',
      interactiveHover: 'hsl($interactiveHoverHsl / 1)',

      channelsIconHsl: '223 calc($saturationFactor * 5.3%) 52.9%',
      channelsIcon: 'hsl($channelsIconHsl / 1)',

      headerBarBackgroundHsl: '223 calc($saturationFactor * 6.7%) 20.6%',
      headerBarBackground: 'hsl($headerBarBackgroundHsl / 1)',

      backgroundOpacityChat: '0.8',
      backgroundOverlayColor: '0 0 0',

      backgroundOverlayChat:
        'linear-gradient(rgb($backgroundOverlayColor / $backgroundOpacityChat), rgb($backgroundOverlayColor / $backgroundOpacityChat)) fixed 0 0/cover, hsl($backgroundHsl / 1) fixed 0 0/cover',

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

      systemMessageDark: '#999999',
      interactiveNormal: '#dcddde',
      accent: '#5865f2',
      accentOpacity60: '#5865f299',

      backgroundOpacity10: '#36393f1a',

      mentioned: 'rgba(250, 166, 26, 0.1)',
      mentionedHover: 'rgba(250, 168, 26, 0.08)',
      mentionedBorder: '#faa81a',

      inputBackground: 'rgba(255, 255, 255, 0.03)',

      contextMenuBackground: '#111214',
      messageHover: 'rgba(0, 0, 0, .05)',
      link: '#00b0f4',

      tooltipBackground: '#18191c',

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
      iconSizeLarge: '32px',

      /** 24px */
      iconSizeMed: '24px',

      /** 20px */
      iconSizeSmall: '20px',

      /** 16px */
      messageTypeIcon: '16px',

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

      /** 0 */
      membersSidebarBackdrop: '$none',

      /** 1 */
      membersSidebar: 1,

      /** 10 */
      tooltip: 10,

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
        '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)',

      headerBorder:
        '0 1px 0 hsl(0 calc( 1 *0%) 0.8% /0.2),0 1.5px 0 hsl( 240 calc(1 *7.7%) 2.5% /0.05),0 2px 0 hsl( 0 calc(1 *0%) 0.8% /0.05)'
    },

    fontWeights: {
      /** font-weight: 400 */
      regular: 400,

      /** font-weight: 500 */
      medium: 500,

      /** font-weight: 600 */
      semibold: 600,

      /** font-weight: 700 */
      bold: 700
    },

    borderWidths: {
      /** border-width: 2px */
      spines: '2px'
    },

    radii: {
      /** 2px */
      xxxs: '2px',

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
    }),

    backgroundOverlay: (color: ScaleValue<'colors'>) => ({
      // @ts-expect-error
      background: `linear-gradient(rgb($backgroundOverlayColor / $backgroundOpacityChat), rgb($backgroundOverlayColor / $backgroundOpacityChat)) fixed 0 0/cover, ${color.value} fixed 0 0/cover`,

      backgroundSize: 'auto',
      backgroundImage: 'none'
    })
  }
});

export const { theme, globalCss, keyframes, css, getCssText, styled } = stitches;
