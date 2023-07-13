import { Popout } from '@components/Overlays/Modal/Popout/index';
import * as Styles from '@components/Overlays/Modal/styles';
import { ThreadsPanelButton } from '@icons/Buttons/ThreadsPanelButton';
import { NoThreadsIcon } from '@icons/NoThreadsIcon';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState, useStoreActions } from '@state';
import { ReactElement, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ThreadsPopoutProps {
  children: ReactElement<any, any>;
}
export const ThreadsPopout = ({ children }: ThreadsPopoutProps) => {
  const translate = useTranslation();
  const { guildId, channelId, router } = useAppRouter();

  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);

  const childrenRef = useRef<HTMLDivElement>(null);

  const currentChannelThreads = guildChannels[channelId]?.threads ?? [];

  const hideThreadsModal = () => {
    setShowThreadsModal(false);
  };

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
              {' '}
              {currentChannelThreads.map(thread => (
                <Styles.ThreadsPopoutListItem
                  key={thread.id}
                  onClick={() =>
                    router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`)
                  }
                >
                  <Styles.ThreadName>{thread.name}</Styles.ThreadName>

                  <ThreadsPanelButton thread={thread} />
                </Styles.ThreadsPopoutListItem>
              ))}
            </Styles.ThreadsPopoutList>
          </Styles.ThreadsPopoutContent>
        ) : (
          <Styles.NoThreadsContent>
            <NoThreadsIcon />
            <Styles.NoThreadsHeader>{translate.t('nothreads')}</Styles.NoThreadsHeader>
          </Styles.NoThreadsContent>
        )}
      </Popout>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};
