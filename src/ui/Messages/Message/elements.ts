
/*
==============================================================

  Message

==============================================================
 */

import styled from '../ThemeContext'
import {Twemoji} from "@ui/shared/Emoji/emoji";
import {css} from "react-emotion";
import add from "@images/discordAssets/e06a573355c490f7ce6e3125ac01db81.svg";

export const MessageBase = styled('div')`
  position: relative;
  padding: 2px 48px 2px 72px;

  & .short-time {
    display: none;
  }

  a {
    color: #00b0f4;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  &:hover {
    background-color: ${({theme}) => theme.colors._background.darken(0.07).string()};
    
    & .short-time {
      display: inherit;
    }
  }
`;

export const SystemMessageBase = styled(MessageBase)`
  display: flex;
  align-items: center;
`;

export const SystemMessageContent = styled.span`
  color: ${({theme}) => theme.colors._primary.darken(0.5).string()};
`;

export const ReplySpine = styled.div`
  position: absolute;
  width: 33px;
  height: 12px;
  top: 8px;
  left: 34px;
  border-left: 2px solid #4f545c;
  border-top: 2px solid #4f545c;
  border-top-left-radius: 6px;

  @media (max-width: 500px), (max-height: 370px) {
    top: 20px;
    left: 35px;
  }

  @media (max-width: 400px), (max-height: 340px) {
    width: 25.5px;
    left: 32.5px;
  }

  @media (max-width: 260px) {
    left: 30px;
  }
`;

interface ContentBase {
  isReplyContent?: boolean;
}
export const ContentBase = styled('span')`
  text-overflow: ellipsis;
  overflow: hidden;
  
  ${
    ({isReplyContent}: ContentBase) => isReplyContent
        ? css`
              font-size: 14px;
              opacity: 0.64;
              cursor: pointer;
              white-space: nowrap;

              &:hover {
                opacity: 1;
              }
        `
        : css`
              white-space: break-spaces;
        `
  }
`

export const ReplyInfoBase = styled('div')`
  display: flex;
  flex-direction: row;
`

export const ReplyUserBase = styled('span')`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
`;

export const MiniUserAvatarBase = styled('img')`
  border-radius: 100%;
  width: 16px;
  height: 16px;
`;

interface MiniUserNameBaseProps {
  color: string;
}
export const MiniUserNameBase = styled('span')<MiniUserNameBaseProps>`
  margin-right: 4px;
  margin-left: 4px;
  font-size: 14px;
  opacity: 0.64;
  font-weight: 500;
  white-space: nowrap;

  color: ${({color}) => color};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const MessageHeaderBase = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SmallTimestampBase = styled('time')`
  position: absolute;
  left: 0;
  width: 56px;
  text-align: right;
  font-size: 0.6875rem;
  margin-top: 4px;
  user-select: none;

  color: ${({theme}) => theme.colors._primary.fade(0.5).string()};
`;

export const LargeTimestampBase = styled('time')`
  font-size: 0.75rem;
  margin-left: 8px;
  cursor: default;
  height: fit-content;
  
  color: ${({theme}) => theme.colors._primary.fade(0.5).string()};
`;

export namespace Icons {
  const IconBase = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 16px;
    width: 72px;
    height: 16px;
  `

  export const Add = styled(IconBase)`
    background-image: url("${add}");
  `;
}

/*
==============================================================

  Message Author

==============================================================
 */

export const AuthorBase = styled.span`
  display: inline-flex;
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
