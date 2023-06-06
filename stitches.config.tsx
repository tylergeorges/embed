import { createStitches } from '@stitches/react';
import React, { ForwardedRef, forwardRef } from 'react';
import OverridableStyledComponent, { Element } from '@components/Core/OverridableStyledComponent';

// @media screen and (max-width: 578px)

// @sm	@media (min-width: 640px)
// @md	@media (min-width: 768px)
// @lg	@media (min-width: 1024px)
// @xl	@media (min-width: 1280px)
// @xxl	@media (min-width: 1536px)

// screen and
export const mediaQuery = {
  small: 'screen and (max-width: 768px)'
};
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
      textMuted: 'rgb(163, 166, 170)',

      systemMessageDark: '#999999',
      interactiveNormal: '#dcddde',
      accent: '#5865f2',
      accentOpacity60: '#5865f299',

      background: '#313338',
      backgroundOpacity10: '#36393f1a',
      backgroundSecondary: '#2b2d31',
      backgroundSecondaryAlt: '#232428',
      backgroundTertiary: '#232428',

      inputBackground: 'rgba(255, 255, 255, 0.07)',

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
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '32px'
    },
    space: {
      '2xs': '4px',
      xs: '6px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px'
    },
    sizes: {
      iconSizeLarge: '30px',
      iconSizeSmall: '20px',
      iconSizeMed: '24px',
      iconSizeXl: '36px',
      messageTypeIcon: '16px',

      threadButton: '34px',
      sideBarWidth: '200px',
      threadPanelMinWidth: '400px',

      channelNameWidth: 'calc(100% - 16px)',
      channelNameHeight: '32px',

      messageLeftPadding: '72px',

      messageInputSize: '43px',
      headerHeight: '48px'
    },
    shadows: {
      dropShadow: 'rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
      headerDropShadow:
        '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)'
    },
    fontWeights: {
      thin: 400,
      medium: 500,
      bold: 600
    },
    borderWidths: {
      spines: '2px'
    },
    radii: {
      '2xs': '4px',
      xs: '6px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px',
      round: '99999999999px'
    },

    // media: {
    //   // sm: '(min-width: 640px)',
    //   // md: '(min-width: 768px)',
    //   // lg: '(min-width: 1024px)',
    //   // xl: '(min-width: 1280px)',
    //   // xxl: '(min-width: 1536px)',
    //   // small: '(min-width: 768px)'
    //   small: 'screen and (max-width: 768px)',
    // },

    singleChannel: {
      enable: false
    },
    url: {
      height: 0
    },
    readOnly: {
      enable: false
    }
  }
});

export function styled<
  Comp extends Element,
  Css extends string | ((args: { as?: Element } & Record<string, unknown>) => string)
>(component: Comp, overrideClassName: string, cssClass: Css) {
  type ToReturnProps<TStitchesProps extends { as?: Element }> = React.ComponentProps<
    TStitchesProps extends { as: Element } ? TStitchesProps['as'] : Comp
  > & {
    stitchesProps?: TStitchesProps &
      (Css extends (arg: infer P) => string ? P : {}) &
      (React.ComponentProps<Comp> extends { stitchesProps: infer P } ? P : {});
  };

  function ComponentToReturn<TStitchesProps extends { as?: Element }>(
    props: ToReturnProps<TStitchesProps>,
    ref: ForwardedRef<Comp>
  ) {
    const { stitchesProps, ...restOfProps } = props;

    const actualClassName = cssClass instanceof Function ? cssClass(stitchesProps) : cssClass;

    return (
      // @ts-expect-error TS2322
      <OverridableStyledComponent
        component={component}
        className={actualClassName}
        overrideClassName={overrideClassName}
        innerRef={ref}
        {...restOfProps}
      />
    );
  }

  const refForwarded = forwardRef(ComponentToReturn);

  refForwarded.toString = () => `.${overrideClassName}`;

  return refForwarded;
}

export const { theme, globalCss, keyframes, css, getCssText } = stitches;
