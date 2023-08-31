import { Popout } from '@components/Overlays/Modal/Popout/index';
import { useStoreState, useStoreActions } from '@state';
import { ReactElement, useCallback, useRef, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import * as Styles from '@components/Overlays/Modal/styles';
import { PinnedMessage } from '@components/Overlays/Modal/Popout/PinnedMessagesPopout/PinnedMessage';
import { NoPins } from './NoPins';

interface PinnedMessagesPopoutProps {
  children: ReactElement<any, any>;
}

export const PinnedMessagesPopout = ({ children }: PinnedMessagesPopoutProps) => {
  const translate = useTranslation();

  const showPinsModal = useStoreState(state => state.ui.showPinsModal);
  const setShowPinsModal = useStoreActions(state => state.ui.setShowPinsModal);
  const pinnedMessages = useStoreState(state => state.guild.pinnedMessages);

  const childrenRef = useRef<HTMLDivElement>(null);

  const hidePinsModal = useCallback(() => {
    setShowPinsModal(false);
  }, [setShowPinsModal]);

  return (
    <>
      <Popout
        title={translate.t('pinnedmessages.tooltip')}
        isOpen={showPinsModal}
        hideModal={hidePinsModal}
        popoutFor={childrenRef.current}
      >
        <Styles.PinnedPopoutWrapper>
          {pinnedMessages.length === 0 ? (
            <NoPins />
          ) : (
            pinnedMessages.map(message => (
              <Fragment key={message.id}>
                <PinnedMessage message={message} />
              </Fragment>
            ))
          )}
        </Styles.PinnedPopoutWrapper>
      </Popout>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};
