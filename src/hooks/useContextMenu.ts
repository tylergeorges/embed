import { useStoreActions } from '@state';

export const useContextMenu = () => {
  const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

  const disableBrowserMenu = (e: React.MouseEvent) => {
    // Disables the browsers default context menu from showing
    e.preventDefault();
  };

  const hideContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(false);
  };

  return { disableBrowserMenu, hideContextMenu };
};
