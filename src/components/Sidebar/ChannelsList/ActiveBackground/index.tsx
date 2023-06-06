import { useStoreState } from '@state';
import { Background } from './elements';

/** Animated background for the current selected channel. */
export const ActiveBackground = () => {
  const currentChannelYPos = useStoreState(state => state.ui.currentChannelYPos);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  if (currentChannelYPos) {
    // <BackgroundContainer>
    return (
      <Background
        css={{
          '--yPos': `${currentChannelYPos}px`
        }}
        isCurrentChannelThread={isCurrentChannelThread}
        className="active-channel_background "
        animated={currentChannelYPos !== 0} // Disables animation on initial render of page
      />
    );
    // </BackgroundContainer>
  }
  return null;
};
