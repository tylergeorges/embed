import styled from "react-emotion";

export const ReplyIconBase = styled.img`
  margin-left: .25rem;
  width: 20px;
  height: 20px;
`;

export const ContentContainerBase = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  
  &[data-is-reply-content="true"] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0 1 auto;
    
    .codeblock {
      display: inline;
      padding: 2px;
      font-size: 12px;
    }
  }
`;

export const ContentMessageTooltipBase = styled.div`
  max-width: 60vw;
`;

export const LottieStickerWrapper = styled.span`
  width: fit-content;
`

export const StickerTooltipBase = styled.span`
  display: flex;
  align-items: center;
  white-space: break-spaces;
`;

export const StickerTooltipIconBase = styled.img`
  margin-right: .25rem;
`;

export const ThreadButtonContainerBase = styled.div`
  margin-top: 4px;
  width: 100%;
  display: block;
`;

export const ThreadButtonHeight = "34px";

export const ThreadButtonBase = styled.div`
  width: fit-content;
  padding: 8px;
  height: ${ThreadButtonHeight};
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors._background.darken(0.2).string()};
`;

export const ThreadButtonTopLineBase = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 600;
`;

export const ThreadButtonNameBase = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SeeThreadButtonBase = styled.div`
  margin-left: 8px;
  color: #00aff4;
  white-space: nowrap;
  
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
