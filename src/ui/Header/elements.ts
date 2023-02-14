import Button from '@ui/shared/button'
import { Hash, NSFW, News, NSFWNews, Rules, ThreadHash, Voice, NSFWVoice, User } from '@ui/shared/Channel'
import Markdown from '@ui/shared/markdown/render'
import styled from '@lib/emotion'
import { Twemoji } from '@ui/shared/Emoji/emoji'


export const Root = styled('header')`
  overflow: hidden;
  user-select: none;
  display: flex;
  flex-shrink: 0;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
  0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09),
  0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06);
`

export const SingleChannel = styled('div')`
  ${({theme}) => theme.singleChannel ? null : 'display: none'}
`

export const Inner = styled('div')`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
  height: 47px;
  padding: 10px 0;
  @media (max-width: 270px), (max-height: 300px) {
    height: 41px;
    padding: 7px 0;
  }
`

export const Stretch = styled('div')`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  flex-shrink: 1;
  width: 0;
`

const name = (hash: typeof Hash) => styled(hash)`
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  height: 25px;
  margin: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;

  background-position: 0 50%;
  padding-left: 25px;

  @media (max-width: 350px) {
    background: none;
    padding-left: 0;
  }

  @media (max-width: 330px) {
    flex-shrink: 1;
  }

  @media (max-width: 270px) {
    font-size: 16px;
  }
`

export const Name = name(Hash)

export const ThreadName = name(ThreadHash)

export const NewsName = name(News)

export const NSFWName = name(NSFW)

export const NSFWNewsName = name(NSFWNews)

export const RulesName = name(Rules)

export const VoiceName = name(Voice)

export const NSFWVoiceName = name(NSFWVoice)

export const UserName = name(User)

export const Emoji = styled(Twemoji)`
  width: 18px !important;
  height: 100% !important;
  margin-right: 2px !important;
  vertical-align: -0.4em;
`

export const TopicWrapper = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
`

interface TopicProps {
  clickable?: boolean
}
export const Topic = styled(Markdown.withComponent('div'))<TopicProps>`
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  padding: 0 15px;
  display: block;
  align-items: center;
  border-left: 1px solid
    ${({ theme }) => theme.colors._primary.fade(0.9).string()};
  color: ${({ theme }) => theme.colors._primary.fade(0.4).string()};

  * {
    color: inherit;
  }

  a {
    color: #1296cf;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 330px) {
    display: none;
  }
`

const JoinLink = Button.withComponent('a')

export const Join = styled(JoinLink)`
  background: ${({ theme }) => theme.colors._accent.fade(0.6).string()};
  margin-right: 20px;
  flex-shrink: 0;
`;

export const SingleChannelAuthWrapper = styled('div')`
  ${({theme}) => theme.singleChannel && !theme.readonly ? null : 'display: none'};
  margin-right: 10px;
  > a {
    display: block;
  }
`

export const Fullscreen = styled('svg')`
  margin-right: 1rem;
  cursor: pointer;
  
  path {
    color: ${({theme}) => theme.colors._primary.fade(0.6).string()};
  }
`;

export const CloseMemberListBase = styled.div`
  position: relative;
  margin-right: 15px;
`;
