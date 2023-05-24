import { ContextMenuWrapper, ContextMenuItem } from '@components/Overlays/ContextMenu/elements';
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
    <ContextMenuWrapper
      css={{
        left: contextMenuData.xPos,
        top: contextMenuData.yPos
      }}
    >
      <ContextMenuItem onClick={copyToClipboard}>Copy Link</ContextMenuItem>
    </ContextMenuWrapper>
  );
};
