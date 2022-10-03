import styled from "@lib/emotion";
import { MemberLink } from "@ui/shared/Member";

export const MessageGroupBase = styled('div')`
  padding-top: 17px;
`

/*
==============================================================

  DM Member

==============================================================
 */
interface NameProps {
  color?: number
}
export const Member = styled(MemberLink)<NameProps>`
  color: ${({ theme, color }) => (color ? '#'+color.toString(16).padStart(6, '0') : theme.colors.primary)};
  font-weight: 500;
  /*cursor: pointer;
  &:hover {
    text-decoration: underline;
  }*/
`
