import * as Styles from '@components/Header/styles';
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

  children?: ReactNode;
}

export const Header = ({ name, shadowEnabled, isChannelHeader, children }: HeaderProps) => (
  <Styles.HeaderRoot shadowEnabled={shadowEnabled} draggable={false}>
    {children}
    {isChannelHeader ? (
      <ChannelHeader />
    ) : (
      <Styles.GuildHeader>
        <Styles.GuildHeaderName>{name}</Styles.GuildHeaderName>
      </Styles.GuildHeader>
    )}
  </Styles.HeaderRoot>
);
