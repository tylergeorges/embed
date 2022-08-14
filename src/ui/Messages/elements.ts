import styled from "react-emotion";
import { MemberLink } from "@ui/shared/Member";

export const MessageGroupBase = styled.div`
  padding-top: 17px;
`

/*
==============================================================

  MessageSeparator

==============================================================
 */

export const MessageSeparatorBase = styled.div`
  padding: 24px 16px 8px;
`;

export const MessageSeparatorLineBase = styled.div`
  height: 1px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors._background.lighten(0.2).string()};
`;

export const MessageSeparatorContentBase = styled.time`
  font-weight: 600;
  font-size: 12px;
  padding: 2px 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors._primary.darken(0.3).string()};
`;

/*
==============================================================

  DM Member

==============================================================
 */
interface MemberBaseProps {
  color?: number
}
export const MemberBase = styled(MemberLink)<MemberBaseProps>`
  color: ${({ theme, color }) => (color ? '#'+color.toString(16).padStart(6, '0') : theme.colors.primary)};
  font-weight: 500;
  /*cursor: pointer;
  &:hover {
    text-decoration: underline;
  }*/
`
