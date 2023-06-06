import { ThreadsPopover } from '@components/Overlays/Modal/Popover/ThreadsPopover';
import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { ThreadsIcon } from '@components/Shared/Icons/ThreadsIcon';
import { useStoreActions, useStoreState } from '@state';

export const ThreadsButton = () => {
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);

  const openThreadsModal = () => {
    setShowThreadsModal(!showThreadsModal);
  };

  return (
    <>
      <ThreadsPopover>
        <IconButtonWrapper button_label="Threads" tooltipPlacement="bottom">
          <ThreadsIcon onClick={openThreadsModal} color="light" />
        </IconButtonWrapper>
      </ThreadsPopover>
    </>
  );
};
