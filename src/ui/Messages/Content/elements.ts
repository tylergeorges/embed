import styled from "react-emotion";

export const ReplyIconBase = styled.img`
  margin-left: .25rem;
  width: 20px;
  height: 20px;
`;

export const ContentContainerBase = styled.div`
  &[data-is-reply-content="true"] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0 1 auto;
  }
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
