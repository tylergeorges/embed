import {Message_attachments} from "@generated";
import {
  VideoAttachmentBase,
  VideoAttachmentContainerBase,
  VideoAttachmentOverlay
} from "@ui/Messages/Content/Attachment/elements";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import fileSize from "filesize";

interface VideoAttachmentProps {
  attachment: Message_attachments;
}

function VideoAttachment(props: VideoAttachmentProps) {
  const [hasPlayedOnceBefore, setHasPlayedOnceBefore] = useState(false);
  const [paused, setPaused] = useState(true);
  const [showPlayOrPauseAnimation, setShowPlayOrPauseAnimation] = useState(false);
  const [durationPlayed, setDurationPlayed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef(null);
  const attachmentRef = useRef(null);

  const durationPlayedHumanized = useMemo(
    () => {
      const minutesPassed = Math.floor(videoRef.current?.currentTime / 60);
      const secondsPassedRaw = Math.floor(videoRef.current?.currentTime % 60);
      const secondsPassed = secondsPassedRaw < 10 ? `0${secondsPassedRaw}` : secondsPassedRaw;

      const minutesTotal = Math.floor(videoRef.current?.duration / 60);
      const secondsTotalRaw = Math.floor(videoRef.current?.duration % 60);
      const secondsTotal = secondsTotalRaw < 10 ? `0${secondsTotalRaw}` : secondsTotalRaw;

      return `${minutesPassed}:${secondsPassed}/${minutesTotal}:${secondsTotal}`;
    },
    [durationPlayed, videoRef.current]
  );

  const playVideo = () => {
    const video = videoRef.current;

    if (video === null)
      return;

    if (video.paused)
      video.play();
    else
      video.pause();
  }

  const updatePauseState = useCallback((pauseState: boolean) => {
    setPaused(pauseState);
    setShowPlayOrPauseAnimation(true);
    setTimeout(() => setShowPlayOrPauseAnimation(false), VideoAttachmentOverlay.PlayOrPauseAnimationDuration);
  }, [])

  const height = !isFullscreen ? Math.min(props.attachment.height, 300) : undefined;
  const width = !isFullscreen
    ? Math.floor(
      Math.min(props.attachment.height, 300) / props.attachment.height * props.attachment.width
    )
    : undefined;

  const fullScreenChange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  }

  useEffect(
    () => {
      document.addEventListener("fullscreenchange", fullScreenChange);

      return () => {
        document.removeEventListener("fullscreenchange", fullScreenChange);
      }
    },
    [],
  );

  return (
    <div className={VideoAttachmentContainerBase} style={{width}} ref={attachmentRef}>
      <video
        className={VideoAttachmentBase}
        preload="metadata"
        src={props.attachment.url}
        height={height}
        width={width}
        ref={videoRef}
        onPause={() => updatePauseState(true)}
        onPlay={() => {
          updatePauseState(false);
          setHasPlayedOnceBefore(true);
        }}
        onTimeUpdate={({timeStamp}) => setDurationPlayed(timeStamp)}
      />
      <VideoAttachmentOverlay.Base data-played-once={hasPlayedOnceBefore}>
        {showPlayOrPauseAnimation && (
          <VideoAttachmentOverlay.PlayOrPauseButtonAnimation data-paused={paused} />
        )}
        <VideoAttachmentOverlay.MetadataBase>
          <VideoAttachmentOverlay.MetadataTitleBase>
            {props.attachment.filename}
          </VideoAttachmentOverlay.MetadataTitleBase>
          <VideoAttachmentOverlay.MetadataFilesizeBase>
            {fileSize(props.attachment.size, {base: 2})}
          </VideoAttachmentOverlay.MetadataFilesizeBase>
        </VideoAttachmentOverlay.MetadataBase>
        <VideoAttachmentOverlay.Control onClick={playVideo} />
        <VideoAttachmentOverlay.VideoControlsBase>
          <VideoAttachmentOverlay.PlayOrPauseButtonBase data-paused={paused} />
          {width > 200 && (
            <VideoAttachmentOverlay.VideoControlsTimeBase>
              {durationPlayedHumanized}
            </VideoAttachmentOverlay.VideoControlsTimeBase>
          )}
          <VideoAttachmentOverlay.ProgressBarBase>
            <VideoAttachmentOverlay.ProgressBarFillBase
              style={{
                width: videoRef.current?.currentTime / videoRef.current?.duration * 100 + 2 + "%"
              }}
            />
          </VideoAttachmentOverlay.ProgressBarBase>
          <VideoAttachmentOverlay.FullscreenButtonBase onClick={() => {
            if (document.fullscreenElement === null)
              attachmentRef.current?.requestFullscreen();
            else
              document.exitFullscreen();
          }} />
        </VideoAttachmentOverlay.VideoControlsBase>
      </VideoAttachmentOverlay.Base>
    </div>
  );
}

export default VideoAttachment;
