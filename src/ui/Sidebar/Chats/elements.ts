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
    selected?: boolean
}
export const Chat = styled.div<ChatProps>`
    display: flex;
    padding: 3px 8px;
    margin: 2px 8px;
    align-items: center;
    border-radius: 3px;

    &:hover {
        background-color: ${({ selected, theme }) => !selected && theme.colors._primary.fade(0.96).string()};
    }

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

export const Title = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const Preview = styled.span`
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const LoadingContainer = styled.div`
    height: 100%;
`

export const NewChatButton = styled(Button)`
    display: flex;
    margin: 0 auto 10px;
    align-items: center;
    gap: 5px;
`
