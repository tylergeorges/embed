import * as Styles from '@components/Overlays/ContextMenu/styles';
import { useStoreActions, useStoreState } from '@state';

export const ContextMenu = () => {
  const contextMenuData = useStoreState(state => state.ui.contextMenuData);
  const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(contextMenuData?.channelLink || '')
      .then(() => {})
      .catch(err => {
        console.error('Could not copy channel link: ', err);
      });

    setShowContextMenu(false);
  };

  return (
    <Styles.ContextMenuWrapper
      css={{
        left: contextMenuData.xPos,
        top: contextMenuData.yPos
      }}
    >
      <Styles.ContextMenuItem onClick={copyToClipboard}>Copy Link</Styles.ContextMenuItem>
    </Styles.ContextMenuWrapper>
  );
};
