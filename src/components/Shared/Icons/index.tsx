import { IconRoot } from '@icons/Buttons/IconButtonWrapper/styles';
import { CSS } from '@stitches/react';
import { svgUrls } from '@svg-assets';

const iconData = {
  ThreadHash: svgUrls.IconThreadChannel,
  ThreadSpine: svgUrls.IconThreadSpine,
  ThreadPanel: svgUrls.IconThreadPanel,

  TextChannelHash: svgUrls.IconTextChannel,
  NewsChannelIcon: svgUrls.IconNewsChannel,
  RulesChannelIcon: svgUrls.IconRulesChannel,
  FourmChannelIcon: svgUrls.IconForumChannel,

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

  type?: 'headerIcon';

  iconContent?: string | null;

  customViewbox?: string;
}

export const Icons = ({ name, color, css, size, type, iconContent, customViewbox }: IconProps) => (
  <>
    <IconRoot
      css={css}
      size={size ?? 'regular'}
      type={type}
      color={color ?? 'light'}
      viewBox={customViewbox ?? '0 0 24 24'}
    >
      <use href={`${iconData[name]}#svg`} />
      {iconContent}
    </IconRoot>
  </>
);
