import styled from '@lib/emotion'

import {css} from "react-emotion";
export const Root = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`

export const Image = styled.img<{isFromEmbed: boolean | undefined}>`
  height: 100%;
  border-radius: 3px;
  
  ${({isFromEmbed}) => !isFromEmbed && `width: 100%;`}
`

export const Error = css`
  object-fit: none;
  background-color: rgba(0, 0, 0, 0.2);
`;
