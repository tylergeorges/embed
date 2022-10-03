import { ScrollVisible } from '@ui/shared/scrollable'
import SmartList from '@ui/shared/SmartList'
import styled from '@lib/emotion'
import { AutoSizer } from 'react-virtualized'
import {injectGlobal} from '@emotion/css/macro';

interface Props {
  squashed: boolean
}

export const Root = styled('div')<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: margin 0.3s ease, width 0.3s ease, box-shadow 0.2s ease;
`

injectGlobal`
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  ::-webkit-scrollbar-track {
    background-color: #2e3338;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb:hover {
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb:hover {
    background-color: #202225;
    min-height: 40px;
    border-radius: 8px;
  }
`;

export const Scroller = ScrollVisible.withComponent(SmartList)

export interface MessagesWrapperProps {
  stale: boolean
}

export const MessageList = styled(AutoSizer)``

export const MessagesWrapper = styled('div')<MessagesWrapperProps>`
  flex-grow: 1;

  ${MessageList} {
    transition: opacity 0.2s ease;
    opacity: ${({ stale }) => (stale ? 0.4 : 1)};
  }
`

export const ScrollerSpacer = styled('div')`
  height: 24px;
`;
