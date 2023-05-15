import { GuildHeader, GuildHeaderName, HeaderRoot } from '@components/Header/elements';
import { ChannelHeader } from '@components/Header/ChannelHeader';

export interface HeaderProps {
  /** Name to display in header. */
  name: string;

  /** If the header should have a drop shadow or not.
   *
   * Drop shadow is disabled by default.
   */
  shadowEnabled?: boolean;

  /** If the header we are going to render is a text channel name, doing this
   *  to hide the hash for non channels.
   */
  isChannelHeader: boolean;

  channelTopic?: string;
}

/** Reusable Header component. */
export const Header = ({ name, shadowEnabled, isChannelHeader, channelTopic }: HeaderProps) => (
  <HeaderRoot shadowEnabled={shadowEnabled} className="header-root">
    {isChannelHeader ? (
      <ChannelHeader channelName={name} channelTopic={channelTopic || ''} />
    ) : (
      <GuildHeader className="guild-header">
        <GuildHeaderName className="guild-header_name">{name}</GuildHeaderName>
      </GuildHeader>
    )}
  </HeaderRoot>
);
