import { useStoreState } from '@state';
import { useAppRouter } from '@hooks/useAppRouter';
import * as Styles from './styles';

/** Animated background for the current selected channel. */
export const ChannelHighlighter = () => {
  const currentChannelYPos = useStoreState(state => state.ui.currentChannelYPos);

  const { threadId } = useAppRouter();
  // console.log(currentChannelYPos)

  if (currentChannelYPos) {
    return (
      <Styles.Background
        css={{
          '--yPos': `${currentChannelYPos}px`
        }}
        isCurrentChannelThread={!!threadId}
        className="channel-name" //! NEEDS THIS TO MATCH CHANNEL NAME SIZE
        animated={currentChannelYPos !== 0} // Disables animation on initial render of page
      />
    );
  }
  return null;
};
