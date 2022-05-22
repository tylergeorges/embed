import styled, { css } from '@lib/emotion'
import { ScrollOverlay } from '@ui/shared/scrollable'
import Button from "@ui/shared/button";

export const Root = styled(ScrollOverlay)`
  & > div:nth-child(1) {
    & > *:last-child {
      margin-bottom: 40px;
    }
  }
`;

interface ChatProps {
    selected: boolean
}
export const Chat = styled.div<ChatProps>`
    display: flex;
    padding: 3px 0;
    margin: 2px 8px;
    align-items: center;
    border-radius: 3px;

    ${({ selected, theme }) => selected ? css`
        background-color: ${theme.colors._primary.fade(.9).toString()};
    ` : ''}
`

export const Avatar = styled.img`
    border-radius: 50%;
    margin-right: 12px;
`

export const Details = styled.div`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    min-width: 0;
`

export const Preview = styled.span`
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
