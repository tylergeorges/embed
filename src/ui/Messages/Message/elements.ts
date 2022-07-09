
/*
==============================================================

  Message

==============================================================
 */

import styled from '../ThemeContext'
import {Twemoji} from "@ui/shared/Emoji/emoji";
import {css} from "react-emotion";
import add from "@images/discordAssets/e06a573355c490f7ce6e3125ac01db81.svg";
import {memo} from "react";
import pin from "@images/discordAssets/5da4cdab01d4d89c593c48c62ae0d937.svg";

export namespace MessageContainerStyle {
  export const Base = styled.div`
    position: relative;
    margin-right: 14px;
    
    &:hover {
      --background-color: ${({theme}) => theme.colors._background.darken(0.07).string()};
      
      .buttons {
        display: flex;
      }
    }
  `;

  export const Buttons = styled.div`
    position: absolute;
    right: 14px;
    top: 0;
    transform: translateY(-50%);
    display: none;
    flex-direction: row;
    box-shadow: 0 0 0 1px rgba(4, 4, 5, 0.15);
    background-color: ${props => props.theme.colors.background};
    z-index: 1;
    border-radius: 4px;
    overflow: hidden;
    transition: box-shadow 0.1s ease-in-out;
    
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 1px rgba(4, 4, 5, 0.15), 0 4px 4px rgba(0, 0, 0, 0.16);
    }
  `;

  export const Button = styled.button`
    border: none;
    border-radius: 0;
    display: flex;
    padding: 6px;
    opacity: 0.7;
    
    &:hover {
      background-color: ${props => props.theme.colors._primary.fade(0.9).string()};
      opacity: 1;
    }
  `;
}

interface MessageBaseProps {
  isUserMentioned?: boolean;
}
export const MessageBase = styled.div<MessageBaseProps>`
  position: relative;
  padding: 2px 48px 2px 72px;

  &:hover  .short-time {
    display: inherit;
  }
  
  ${({isUserMentioned}) => isUserMentioned && css`
    --background-color: rgba(250, 168, 26, 0.1);
    
    &:hover {
      --background-color: rgba(250, 168, 26, 0.08);
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: #faa81a;
    }
  `}

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
  
  background-color: var(--background-color);
`;

export const SystemMessageBase = styled(MessageBase)`
  display: flex;
  align-items: center;
`;

export const SystemMessageContent = styled.span`
  color: ${({theme}) => theme.colors._primary.darken(0.5).string()};
`;

interface PinnedMessageLinkProps {
  cursor?: string;
}
export const PinnedMessageLinkBase = memo(styled.span<PinnedMessageLinkProps>`
  color: ${({theme}) => theme.colors._primary.string()};
  
  &:hover {
    cursor: ${({cursor}) => cursor !== undefined ? cursor : 'pointer'};
    text-decoration: underline;
  }
`);

export const ReplySpine = memo(styled.div`
  position: absolute;
  width: 33px;
  height: 12px;
  top: 9px;
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
`);

export const EditedBase = styled.span`
  font-size: 10px;
  margin-left: 4px;
  
  color: ${({theme}) => theme.colors._primary.darken(0.5).string()};
`;

interface ContentBase {
  isReplyContent?: boolean;
}
export const ContentBase = styled('span')`
  ${
    ({isReplyContent}: ContentBase) => isReplyContent
        ? css`
              font-size: 14px;
              opacity: 0.64;
              cursor: pointer;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;

              &:hover {
                opacity: 1;
              }
        `
        : css`
              white-space: break-spaces;
        `
  }
`;

export const ReplyInfoBase = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
`

export const ReplyUserBase = styled.span`
  display: flex;
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
export const MiniUserNameBase = styled.span<MiniUserNameBaseProps>`
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

  export const Add = memo(styled(IconBase)`
    background-image: url("${add}");
  `);

  export const Pinned = memo(styled(IconBase)`
    background-image: url("${pin}");
  `);
}

/*
==============================================================

  Message Accessories

==============================================================
 */

export const MessageAccessoriesBase = styled.div`
  display: grid;
  padding-top: 4px;
  padding-bottom: 4px;
  grid-auto-flow: row;
  grid-row-gap: 4px;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
`;

export const ReactionsBase = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  user-select: none;
`;

export const ReactionBase = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 6px;
  border-radius: 8px;
  cursor: not-allowed;
  
  background-color: ${({theme}) => theme.colors._background.darken(0.2).string()};
`;

export const EmojiTooltipBase = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReactionEmojiBase = styled(Twemoji)`
  width: 16px;
  height: 16px;
`;

export const ReactionCountBase = styled.span`
  margin-left: 6px;
  min-width: 9px;
  font-weight: 500;
  font-size: 14px;
  
  color: ${({theme}) => theme.colors._primary.fade(0.3).string()};
`;



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
export const UsernameBase = memo(styled.span<UsernameBaseProps>`
  color: ${props => props.color};
  font-weight: 500;
  display: inline;
  vertical-align: baseline;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`);

export const AvatarBase = styled.img`
  position: absolute;
  left: 16px;
  margin-top: 1px;
  border-radius: 100%;
  width: 40px;
  height: 40px;
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
