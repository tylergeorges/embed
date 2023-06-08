import { useStoreState } from '@state';
import { useAppRouter } from '@lib/hooks';
import { Background } from './elements';

/** Animated background for the current selected channel. */
export const ChannelHighlighter = () => {
  const currentChannelYPos = useStoreState(state => state.ui.currentChannelYPos);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);
  const { threadId } = useAppRouter();
  if (currentChannelYPos) {
    // <BackgroundContainer>

    console.log(currentChannelYPos);
    return (
      <Background
        css={{
          '--yPos': `${currentChannelYPos}px`
        }}
        isCurrentChannelThread={isCurrentChannelThread && threadId !== ''}
        className="active-channel_background channel-name"
        animated={currentChannelYPos !== 0} // Disables animation on initial render of page
      />
    );
    // </BackgroundContainer>
  }
  return null;
};
