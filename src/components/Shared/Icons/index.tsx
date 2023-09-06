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
  Close: svgUrls.IconCross,
  Members: svgUrls.IconMembers,
  Logout: svgUrls.IconLogout,
  Discord: svgUrls.DiscordIcon
};

type IconNames = keyof typeof iconData;

export interface IconProps extends React.ComponentProps<typeof IconRoot> {
  icon: IconNames;

  iconContent?: string | null;

  customViewbox?: string;
}

export const Icons = ({
  icon,
  color,
  css,
  size,
  type,
  iconContent,
  customViewbox,
  ...props
}: IconProps) => (
  <IconRoot
    css={css}
    size={size ?? 'md'}
    type={type}
    color={color ?? 'light'}
    viewBox={customViewbox ?? '0 0 24 24'}
    {...props}
  >
    <use href={`${iconData[icon]}#svg`} />
    {iconContent}
  </IconRoot>
);
