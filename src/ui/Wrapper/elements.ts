import styled, { css } from '@lib/emotion'

interface Props {
  squashed: boolean
  hideOnMobile: boolean;
  threadFullscreen: boolean;
  memberListOpen: boolean;
  onClick?: any
}

export const Wrapper = styled('div')<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: margin 0.3s ease, width 0.3s ease;

  &::after {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 8;
    pointer-events: none;
    transition: opacity 0.5s ease;
    will-change: opacity;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
  }

  ${({ hideOnMobile }) => 
    hideOnMobile ? css`
      @media only screen and (max-width: 520px) {
        display: none
      }
    ` : null
  }
  
  ${({ threadFullscreen }) =>
    !threadFullscreen ? css`
      border-left: 8px solid #202225;
    ` : null
  }
  
  ${({ squashed, threadFullscreen, theme }) =>
    squashed && !theme.singleChannel
      ? css`
      
      ${threadFullscreen ? css`
        @media (min-width: 521px) {
          margin-left: 200px;
        }
      
        @media (min-width: 521px) and (max-width: 400px),
        (min-width: 521px) and (max-height: 340px) {  
          margin-left: 180px;
        }
      ` : null};

          @media (max-width: 520px) {
            &::after {
              pointer-events: initial;
              opacity: 1;
            }
            * {
              pointer-events: none !important;
            }
          }
        `
      : null};

  ${({ memberListOpen }) =>
    memberListOpen ? css`
      @media (min-width: 521px) {
        margin-right: 200px;
      }
    
      @media (min-width: 521px) and (max-width: 400px),
      (min-width: 521px) and (max-height: 340px) {  
        margin-right: 180px;
      }
    ` : null};
`
