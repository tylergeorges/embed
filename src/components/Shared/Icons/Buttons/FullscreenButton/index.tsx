import { IconButton } from '@icons/Buttons/IconButton';

import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';

export const FullscreenButton = () => {
  const isWindowMobile = useMediaQuery();
  const isThreadFullscreen = useStoreState(state => state.ui.isThreadFullscreen);
  const setIsThreadFullscreen = useStoreActions(state => state.ui.setIsThreadFullscreen);

  const fullscreenThread = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsThreadFullscreen(!isThreadFullscreen);
  };

  if (isWindowMobile) return <></>;

  return (
    <IconButton
      tooltipDisabled
      onClick={fullscreenThread}
      color="channel"
      size="sm"
      icon="Fullscreen"
    />
  );
};
