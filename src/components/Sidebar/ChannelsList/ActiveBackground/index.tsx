import { useStoreState } from '@state';
import { BackgroundContainer, Background } from './elements';

/** Animated background for the current selected channel. */
export const ActiveBackground = () => {
  const currentChannelYPos = useStoreState(state => state.ui.currentChannelYPos);

  if (currentChannelYPos) {
    return (
      <BackgroundContainer>
        <Background
          css={{
            transform: `translateY(${currentChannelYPos}px)`
          }}
          animated={currentChannelYPos !== 0} // Disables animation on initial render of page
        />
      </BackgroundContainer>
    );
  }
  return null;
};
