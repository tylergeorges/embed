import { Popout } from '@components/Overlays/Modal/Popout/index';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState, useStoreActions } from '@state';
import { Fragment, ReactElement, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Styles from '@components/Overlays/Modal/styles';
import { ThreadPopoutItem } from './ThreadPopoutItem';
import { NoThreads } from './NoThreads';

interface ThreadsPopoutProps {
  children: ReactElement<any, any>;
}

export const ThreadsPopout = ({ children }: ThreadsPopoutProps) => {
  const translate = useTranslation();
  const { channelId, guildId } = useAppRouter();

  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);

  const childrenRef = useRef<HTMLDivElement>(null);

  const currentChannelThreads = guildChannels[channelId]?.threads ?? [];

  const hideThreadsModal = useCallback(() => {
    setShowThreadsModal(false);
  }, [setShowThreadsModal]);

  return (
    <>
      <Popout
        title={translate.t('threads.label')}
        TitleIcon="ThreadHash"
        isOpen={showThreadsModal}
        hideModal={hideThreadsModal}
        popoutFor={childrenRef.current}
      >
        {currentChannelThreads.length > 0 ? (
          <Styles.ThreadsPopoutContent>
            <Styles.ThreadsPopoutListHeader>
              {translate.t('olderthreads.label')}
            </Styles.ThreadsPopoutListHeader>

            <Styles.ThreadsPopoutList>
              {currentChannelThreads.map(thread => (
                <Fragment key={`popout-${thread.id}`}>
                  <ThreadPopoutItem
                    currentUrl={`/channels/${guildId}/${channelId}`}
                    thread={thread}
                    key={thread.id}
                  />
                </Fragment>
              ))}
            </Styles.ThreadsPopoutList>
          </Styles.ThreadsPopoutContent>
        ) : (
          <NoThreads />
        )}
      </Popout>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};
