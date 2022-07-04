import styled from '../../ThemeContext'
import {css} from "react-emotion";
import play from "../../../../app/res/images/discordAssets/play.svg";
import pause from "../../../../app/res/images/discordAssets/pause.svg";
import fullscreen from "../../../../app/res/images/discordAssets/fullscreen.svg";

export const VideoAttachmentBase = css`
  &[width] {
    max-width: min(400px, 100%);
  }
  &:not([width]) {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  outline: none;
`;

export const VideoAttachmentContainerBase = css`
  border-radius: 3px;
  overflow: hidden;
  
  position: relative;
  display: flex;
`;

export namespace VideoAttachmentOverlay {
  export const Base = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    --overlayMetaDataTranslateY: -100%;
    --overlayControlsTranslateY: 100%;

    &[data-paused="true"] {
      --overlayMetaDataTranslateY: 0;
    }
    
    &:hover {
      --overlayMetaDataTranslateY: 0;
      --overlayControlsTranslateY: 0;
    }
    
    &[data-paused="true"][data-played-once="true"] {
      --overlayControlsTranslateY: 0;
    }

    &[data-played-once="false"] {
      --overlayControlsTranslateY: 100%;
    }
  `;

  export const Control = styled.div`
    flex: 1 0;
  `;

  export const PlayOrPauseAnimationDuration = 400;

  export const PlayOrPauseButtonAnimation = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 100%;
    padding: 12px;

    @keyframes state-change {
      from {
        background-color: #0005;
        transform: translate(-50%, -50%) scale(1.5);
      }
      
      to {
        transform: translate(-50%, -50%) scale(2.5);
      }
    }

    content: "";
    color: ${({theme}) => theme.colors._primary.string()};
    background-position: center;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    
    animation: state-change ${PlayOrPauseAnimationDuration}ms ease-in-out;
    &[data-paused="true"] {
      background-image: url(${play});
    }
    &[data-paused="false"] {
      background-image: url(${pause});
    }
  `;

  export const MetadataBase = styled.div`
    padding: 12px;
    transition: transform 0.1s ease-in-out;
    transform: translateY(var(--overlayMetaDataTranslateY));

    background-image: linear-gradient(0, transparent, rgba(0, 0, 0, 0.7));
  `;

  export const MetadataTitleBase = styled.div`
    font-size: 16px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `;

  export const MetadataFilesizeBase = styled.div`
    font-weight: 500;
    font-size: 12px;
    opacity: 0.7;
    
    color: ${props => props.theme.colors._primary.string()};
  `;

  export const VideoControlsBase = styled.div`
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 6px 8px;
    gap: 7px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);

    transition: transform 0.1s ease-in-out;
    transform: translateY(var(--overlayControlsTranslateY));
  `;

  export const VideoControlsTimeBase = styled.div`
    font-size: 12px;
    font-family: Consolas, monospace;
    user-select: none;
  `;

  export const ProgressBarBase = styled.div`
    height: 6px;
    border-radius: 80px;
    flex: 1 0;
    cursor: pointer;

    &:hover .progress-bar-fill:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      transform: translateX(50%) translateY(-50%);

      background-color: ${({theme}) => theme.colors._accent.string()};
    }
    
    background-color: ${({theme}) => theme.colors._primary.fade(0.7).string()};
  `;

  export const ProgressBarFillBase = styled.div`
    height: 100%;
    transition: width 0.25s linear;
    position: relative;
    border-radius: 80px;
    
    background-color: ${({theme}) => theme.colors._accent.string()};
  `;

  const ButtonBase = styled.div`
    height: 14px;
    width: 14px;

    background-size: 14px 14px;
    transition: opacity 0.1s ease-in-out;
    opacity: 0.6;
    cursor: pointer;
    
    &:hover {
      opacity: 1;
    }
  `;

  export const PlayOrPauseButtonBase = styled(ButtonBase)`
    &[data-paused="true"] {
      background-image: url(${play});
    }
    &[data-paused="false"] {
      background-image: url(${pause});
    }
  `;

  export const FullscreenButtonBase = styled(ButtonBase)`
    background-image: url(${fullscreen});
  `
}
