import styled, { css } from "@lib/emotion";
import Button from '@ui/shared/button'

interface Props {
    x: number;
    y: number;
}
export const Root = styled.div<Props>`
    position: absolute;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors._background.darken(.55).toString()};
    box-shadow: 0 8px 16px rgba(0,0,0,0.24);
    padding: 16px;
    width: 300px;

    ${({ x, y }) => css`
        left: ${x}px;
        top: ${y}px;
    `}
`

export const Avatar = styled.img`
    border-radius: 50%;
`

export const Top = styled.div`
    display: flex;
    align-items: flex-end;
`

export const Badges = styled.div`
    margin-left: auto;
`

export const Badge = styled.img`
    margin-right: 2px;
`

export const Tag = styled('h1')`
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

export const Discrim = styled.span`
    color: ${({ theme }) => theme.colors._primary.fade(0.335).toString()};
`

export const ProfileButton = styled(Button)`
    margin-top: 15px;
    width: 100%;
    height: 40px;
    line-height: 40px;

    &::before {
        display: none;
    }
`
