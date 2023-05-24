import { GuildHeader, GuildHeaderName, HeaderRoot } from '@components/Header/elements';
import { ChannelHeader } from '@components/Header/ChannelHeader';
import { ReactNode } from 'react';

export interface HeaderProps {
  /** Name to display in header. */
  name?: string;

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

  children?: ReactNode;
}

/** Reusable Header component. */
export const Header = ({
  name,
  shadowEnabled,
  isChannelHeader,
  channelTopic,
  children
}: HeaderProps) => (
  <HeaderRoot shadowEnabled={shadowEnabled} className="header-root">
    {isChannelHeader ? (
      <ChannelHeader channelName={name as string} channelTopic={channelTopic || ''} />
    ) : (
      children || (
        <GuildHeader className="guild-header">
          <GuildHeaderName className="guild-header_name">{name}</GuildHeaderName>
        </GuildHeader>
      )
    )}
  </HeaderRoot>
);
