import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { ChannelsSideBar } from '@components/SideBar/elements';
import { Header } from '@components/Header/Header';
import { useStoreState } from '@hooks/storeHooks';
import { RouterQuery } from 'types/routerQuery';
import { Category } from './Category';
import { ActiveBackground } from './ActiveBackground';

/** This component displays the channels for the given guild, it wraps
 *  the guild header and all of the guilds channels.
 *
 */
export const ChannelsList = () => {
  const router = useRouter();

  const { channel: currentChannelID } = router.query as RouterQuery;

  const guildCategories = useStoreState(state => state.ui.guildCategories);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const guildName = useStoreState(state => state.ui.guildData?.guild.name) as string;

  if (guildCategories) {
    return (
      <ChannelsSideBar type="channels_list" channelsListOpen={isChannelsListOpen}>
        <div className="sidebar-header_container">
          <Header header_name={guildName} isChannelHeader={false} />
        </div>

        <div className="sidebar-children_container">
          <ActiveBackground />

          {guildCategories.map(category => (
            <Fragment key={category.id}>
              <Category currentChannelID={currentChannelID as string} category={category} />
            </Fragment>
          ))}
        </div>
      </ChannelsSideBar>
    );
  }
  return <div>loading...</div>;
};
