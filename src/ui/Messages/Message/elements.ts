
/*
==============================================================

  Message

==============================================================
 */

import styled from '../ThemeContext'
import {Twemoji} from "@ui/shared/Emoji/emoji";

export const MessageBase = styled('div')`
  position: relative;
  padding: 2px 48px 2px 72px;
  white-space: break-spaces;

  & .short-time {
    display: none;
  }
  
  &:hover {
    background-color: ${({theme}) => theme.colors._background.darken(0.07).string()};
    
    & .short-time {
      display: inherit;
    }
  }
`;

export const MessageHeaderBase = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const TimestampBase = styled('time')`
  position: absolute;
  left: 0;
  width: 56px;
  text-align: right;
  font-size: 0.6875rem;
  margin-top: 4px;
  user-select: none;
  
  color: ${({theme}) => theme.colors._primary.fade(0.5).string()};
`;


/*
==============================================================

  Message Author

==============================================================
 */

export const AuthorBase = styled.div`
  display: flex;
  flex-direction: row;
`;

interface UsernameBaseProps {
  color: string;
}
export const UsernameBase = styled.span<UsernameBaseProps>`
  color: ${props => props.color};
  font-weight: 500;
  display: inline;
  vertical-align: baseline;
  
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const AvatarBase = styled.img`
  position: absolute;
  left: 16px;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-top: 2px;
  z-index: 1;
`;



/*
==============================================================

  Role Icon

==============================================================
 */

export const RoleIconBase = styled.img`
  margin-left: .25rem;
  width: 20px;
  height: 20px;
`

export const UnicodeEmoji = styled(Twemoji)`
  margin-left: .25rem;
  width: 20px;
  height: 20px;
`
