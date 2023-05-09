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

const stitches = createStitches({
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    xxl: '(min-width: 1536px)',
    sm_screen: 'screen and (max-width: 640px)',
    md_screen: 'screen  and (max-width: 768px)',
    lg_screen: 'screen and (max-width: 1024px)',
    xl_screen: 'screen and (max-width: 1280px)',
    xxl_screen: 'screen and (max-width: 1536px)'
  },
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
      systemMessageDark: '#999999',
      textMuted: 'rgb(163, 166, 170)',
      interactiveNormal: '#dcddde',
      accent: '#5865f2',
      accentOpacity60: '#5865f299',
      backgroundOpacity10: '#36393f1a',
      background: '#313338',
      backgroundSecondary: '#2b2d31',
      backgroundSecondaryAlt: '#232428',
      backgroundTertiary: '#232428',
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
      attachmentBorder: 'rgba(27, 29, 32, 0.5)',
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
      xl: '20px'
    },
    space: {
      xxs: '1px',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      xxl: '16px'
    },
    sizes: {
      messageLeftPadding: '72px',
      threadButton: '34px',
      messageTypeIcon: '16px',
      sideBarWidth: '200px',
      channelNameHeight: '32px',
      messageInputSize: '44px'
    },
    borderWidths: {
      spines: '2px'
    },
    media: {
      mobile: '(min-width: 520px)'
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
