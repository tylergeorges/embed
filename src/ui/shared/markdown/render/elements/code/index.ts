import styled, { css } from '@lib/emotion'

import { light } from './hljs'

const fonts = `'${[
  'Operator Mono Lig',
  'Operator Mono Book',
  'Operator Mono',
  'Fira Code',
  'Menlo',
  'Consolas',
  'Monaco',
  'monospace'
].join(`','`)}'`

interface Props {
  inline?: boolean
}

export const Code = styled.code<Props>`
  background-color: rgba(0, 0, 0, 0.1) !important;
  font-family: ${fonts};
  font-size: 14px;
  font-weight: 100 !important;

  ${({ inline, theme }) =>
    inline
      ? css`
          color: inherit;
          padding: 0.2em;
          background-color: rgba(0, 0, 0, 0.15) !important;
          border-radius: 3px;
        `
      : css`
          // color: ${theme.colors._primary.darken(0.4).string()} !important;
          border: 1px solid ${theme.colors._background.darken(0.4).string()};
          display: block;
          line-height: 16px;
          margin-top: 6px;
          padding: 7px;
          border-radius: 5px;
        `};

  ${light(fonts)};
`
