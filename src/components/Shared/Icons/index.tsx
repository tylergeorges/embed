import { IconRoot } from '@icons/Buttons/IconButtonWrapper/styles';
import { svgUrls } from '@svg-assets';

const iconData = {
  // Threads
  ThreadHash: svgUrls.IconThreadChannel,
  ThreadSpine: svgUrls.IconThreadSpine,
  ThreadPanel: svgUrls.IconThreadPanel,

  // Channels
  TextChannelHash: svgUrls.IconTextChannel,
  NewsChannelIcon: svgUrls.IconNewsChannel,
  RulesChannelIcon: svgUrls.IconRulesChannel,
  FourmChannelIcon: svgUrls.IconForumChannel,

  // Icon Buttons
  Pin: svgUrls.IconPin,
  NoPins: svgUrls.IconNoPins,
  AddAttachment: svgUrls.IconAddAttachment,
  Close: svgUrls.IconCross
};

type IconNames = keyof typeof iconData;

export interface IconProps extends React.ComponentProps<typeof IconRoot> {
  icon: IconNames;

  type?: 'headerIcon';

  iconContent?: string | null;

  customViewbox?: string;
}

export const Icons = ({ icon, color, css, size, type, iconContent, customViewbox }: IconProps) => (
  <IconRoot
    css={css}
    size={size ?? 'regular'}
    type={type}
    color={color ?? 'light'}
    viewBox={customViewbox ?? '0 0 24 24'}
  >
    <use href={`${iconData[icon]}#svg`} />
    {iconContent}
  </IconRoot>
);
