import * as Styles from '@components/Overlays/ContextMenu/styles';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';

interface MenuItemProps {
  itemLabel: string;
  onClick: () => void;
}
const MenuItem = ({ itemLabel, onClick }: MenuItemProps) => (
  <Styles.ContextMenuItem onClick={onClick}>
    <Styles.ContextMenuItemLabel>{itemLabel}</Styles.ContextMenuItemLabel>
  </Styles.ContextMenuItem>
);

export const ContextMenu = () => {
  const { t } = useTranslation();

  const contextMenuData = useStoreState(state => state.ui.contextMenuData);
  const setShowContextMenu = useStoreActions(state => state.ui.setShowContextMenu);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contextMenuData.channelLink ?? '').catch(err => {
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
      <MenuItem itemLabel={t('contextmenu.copylink')} onClick={copyToClipboard} />
    </Styles.ContextMenuWrapper>
  );
};
