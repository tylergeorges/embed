import { HeaderChannel, HeaderRoot, Stretch } from '@components/Header';
import { Hash } from '@components/Shared/Channel/elements';
import { Hamburger } from './Hamburger/index';

export interface HeaderProps {
  /** Name to display in header. */
  header_name: string;

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
export const Header = ({ header_name, shadowEnabled, isChannelHeader }: HeaderProps) => (
  <HeaderRoot shadowEnabled={shadowEnabled}>
    {isChannelHeader ? (
      // If this is a header for a text channel
      <HeaderChannel>
        <Hamburger />
        <Hash />
        <p className="header-text_content">{header_name}</p>
      </HeaderChannel>
    ) : (
      <Stretch>
        <p className="header-text_content">{header_name}</p>
      </Stretch>
    )}
  </HeaderRoot>
);
