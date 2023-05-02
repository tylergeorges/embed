import { useStoreState } from '@state';
import { Background } from './elements';

/** Animated background for the current selected channel. */
export const ActiveBackground = () => {
  const currentChannelYPos = useStoreState(state => state.ui.currentChannelYPos);

  if (currentChannelYPos) {
    // <BackgroundContainer>
    return (
      <Background
        css={{
          transform: `translateY(${currentChannelYPos}px)`
        }}
        className="active-channel_background "
        animated={currentChannelYPos !== 0} // Disables animation on initial render of page
      />
    );
    // </BackgroundContainer>
  }
  return null;
};
