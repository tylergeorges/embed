import {
  GuildHeader,
  HeaderChannel,
  HeaderChannelNameWrapper,
  HeaderRoot
} from '@components/Header/elements';
import { Hash } from '@components/Shared/Channel/elements';
import { MembersIcon } from '@components/Header/MembersIcon';
import { Hamburger } from './Hamburger/index';

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
}

/** Reusable Header component. */
export const Header = ({ name, shadowEnabled, isChannelHeader }: HeaderProps) => (
  <HeaderRoot shadowEnabled={shadowEnabled} className="header-root">
    {isChannelHeader ? (
      // If this is a header for a text channel
      <HeaderChannel className="text-channel_header">
        <HeaderChannelNameWrapper className="text-channel_header_name_container">
          <Hamburger />
          <Hash />
          <p className="header-text_content">{name}</p>
        </HeaderChannelNameWrapper>
        <MembersIcon />
      </HeaderChannel>
    ) : (
      <GuildHeader className="guild-header">
        <p className="header-text_content">{name}</p>
      </GuildHeader>
    )}
  </HeaderRoot>
);
