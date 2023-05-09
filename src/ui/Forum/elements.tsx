import styled from '@lib/emotion'
import { ContentBase, MiniUserNameBase } from '@ui/Messages/Message/elements'

export const Root = styled.div`
    height: 100%;
`

export const Username = styled(MiniUserNameBase)`
    margin: 0;
`

export const Separator = styled.span`
  margin-right: 4px;
  font-size: 14px;
  opacity: 0.64;
  font-weight: 500;
  white-space: nowrap;
  color: ${props => props.theme.colors._primary.fade(0.2).string()};
`;

export const List = styled.div`
    overflow-y: auto;
    background-color: ${({ theme }) => theme.colors._background.darken(0.25).string()};
    padding: 8px;
    height: 100%;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors._background.darken(0.5).string()};
        border-radius: 5px;
    }
`

export const Thread = styled.button`
    display: block;
    width: 100%;
    background-color: ${({ theme }) => theme.colors._background.darken(.1).string()};
    margin-bottom: 6px;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 15px;
    font-size: 16px;
    text-align: left;
    transition: box-shadow .2s ease-out,transform .2s ease-out,background .2s ease-out,border .2s ease-out,-webkit-box-shadow .2s ease-out,-webkit-transform .2s ease-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px hsl(black/0.24);
    }
`

export const ThreadName = styled.div`
  color: ${props => props.theme.colors._primary.fade(0.2).string()};
  font-weight: 600;
  font-size: 20px;
`;

export const Preview = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    pointer-events: none;
    display: flex;

    span span {
        opacity: 1;
    }
`

export const Time = styled(ContentBase)`
    margin: 0 4px;
`

export const NoThreads = styled.div`
    margin: 75px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        position: relative;
    }

    img {
        position: absolute;
        left: -10px;
    }

    span {
        margin-top: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }
`

export const NoThreadsIcon = styled.div`
    background: ${({ theme }) => theme.colors.background};
    padding: 22px;
    border-radius: 100%;
    display: flex;

    svg {
        width: 36px;
        height: 36px;
    }
`
