import Color from 'color'
import $Channel from '@ui/shared/Channel'
import $Member from '@ui/shared/Member'
import $Role from '@ui/shared/Role'
import styled, { css } from '@lib/emotion'
import { Message_mentions } from '@generated'
import { THEME_COLOR_ACCENT } from '@constants/theme'

interface Props {
  color?: string
  inline?: boolean
  data?: Message_mentions
}

const base = (inline: boolean, color: string, clickable: boolean) => css`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  border-radius: 3px;

  ${inline
    ? css`
        color: ${color};
        &:hover {
          ${clickable && 'text-decoration: underline;'}
        }
      `
    : css`
        padding: 0 2px;
        background-color: ${Color(color).fade(color === THEME_COLOR_ACCENT ? .7 : .9).string()};
        color: ${color === THEME_COLOR_ACCENT ? Color('white').fade(.2).string() : color} !important;
        text-decoration: none !important;

        &:hover {
          ${clickable ?
            css`
              background-color: ${Color(color)
                .fade(.1)
                .string()};
              color: rgba(255, 255, 255, 0.95) !important;
            `
            : 'cursor: text'
          }
        }
      `};
`

export const Mention = styled($Member)<Props>`
  ${({ theme, color, inline }) => base(inline, color || theme.colors.accent, false)};
`

export const Channel = styled($Channel)<Props>`
  ${({ theme, inline }) => base(inline, theme.colors.accent, true)};
`

interface RoleProps extends Props {
  everyone?: boolean
  data?: Message_mentions
}
export const Role = styled($Role)<RoleProps>`
  ${({ theme, color, inline }) => base(inline, color || theme.colors.accent, false)};
`;
