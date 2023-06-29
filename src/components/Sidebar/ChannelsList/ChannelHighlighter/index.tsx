import { useStoreState } from '@state';
import { useAppRouter } from '@lib/hooks';
import * as Styles from './styles';

/** Animated background for the current selected channel. */
export const ChannelHighlighter = () => {
  const currentChannelYPos = useStoreState(state => state.ui.currentChannelYPos);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);
  const { threadId } = useAppRouter();
  if (currentChannelYPos) {
    return (
      <Styles.Background
        css={{
          '--yPos': `${currentChannelYPos}px`
        }}
        isCurrentChannelThread={isCurrentChannelThread && threadId !== ''}
        className="active-channel_background channel-name"
        animated={currentChannelYPos !== 0} // Disables animation on initial render of page
      />
    );
  }
  return null;
};
