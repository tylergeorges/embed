import { useStoreActions } from '@state';
import { useCallback } from 'react';

export const useContextMenu = () => {
  const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

  const disableBrowserMenu = useCallback((e: React.MouseEvent) => {
    // Disables the browsers default context menu from showing
    e.preventDefault();
  }, []);

  const hideContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setShowContextMenu(false);
    },
    [setShowContextMenu]
  );

  return { disableBrowserMenu, hideContextMenu };
};
