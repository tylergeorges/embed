import * as Styles from '@components/Header/styles';
import { ReactNode } from 'react';

export interface HeaderProps {
  /** If the header should have a drop shadow or not.
   *
   * Drop shadow is disabled by default.
   */
  shadowEnabled?: boolean;

  children?: ReactNode;
}

export const Header = ({ shadowEnabled, children }: HeaderProps) => (
  <Styles.HeaderRoot shadowEnabled={shadowEnabled}>{children}</Styles.HeaderRoot>
);
