import { IconRoot } from '@icons/Buttons/IconButtonWrapper/styles';
import { CSS } from '@stitches/react';
import { svgUrls } from '@svg-assets';

const iconData = {
  ThreadHash: svgUrls.IconThreadChannel,
  ThreadSpine: svgUrls.IconThreadSpine,
  ThreadPanel: svgUrls.IconThreadPanel,

  TextChannelHash: svgUrls.IconTextChannel,

  Pin: svgUrls.IconPin,
  AddAttachment: svgUrls.IconAddAttachment,
  Close: svgUrls.IconCross,
  Members: svgUrls.IconMembers,
  NoPins: svgUrls.IconNoPins,
  Stars: svgUrls.IconNoThreadsStars
};

type IconNames = keyof typeof iconData;

export interface IconProps {
  name: IconNames;

  css?: CSS;

  size?:
    | 'small'
    | 'large'
    | 'regular'
    | ({
        '@initial'?: 'small' | 'large' | 'regular' | undefined;
        '@small'?: 'small' | 'large' | 'regular' | undefined;
      } & {
        [x: string]: 'small' | 'large' | 'regular' | undefined;
      })
    | undefined;

  color?:
    | 'dark'
    | 'light'
    | ({
        '@initial'?: 'dark' | 'light' | undefined;
      } & {
        [x: string]: 'dark' | 'light' | undefined;
      })
    | undefined;

  customSize?: number;

  type?: 'headerIcon';

  iconContent?: string | null;

  customViewbox?: string;
}
export const Icons = ({
  name,
  color,
  css,
  size,
  customSize,
  type,
  iconContent,
  customViewbox
}: IconProps) => (
  <IconRoot
    css={css}
    size={size || 'regular'}
    type={type}
    color={color ?? 'light'}
    viewBox={customViewbox || (customSize ? `0 0 ${customSize} ${customSize}` : '0 0 24 24')}
  >
    <use href={`${iconData[name]}#svg`} height={customSize} />
    {iconContent}
  </IconRoot>
);
