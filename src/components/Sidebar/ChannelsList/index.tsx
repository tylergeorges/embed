import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useStoreState } from '@state';
import { RouterQuery } from 'types/routerQuery';
import { Header } from '@components/Header';
import { Category } from './Category';
import { ActiveBackground } from './ActiveBackground';
import { ChannelsSidebarWrapper } from '../elements';

/** This component displays the channels for the given guild, it wraps
 *  the guild header and all of the guilds channels.
 *
 */
export const ChannelsList = () => {
  const router = useRouter();

  const { channel: currentChannelID } = router.query as RouterQuery;

  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const guildName = useStoreState(state => state.guild.data?.name) as string;
  const categories = useStoreState(state => state.guild.categories);

  return (
    <ChannelsSidebarWrapper type="channels_list" channelsListOpen={isChannelsListOpen}>
      <div className="sidebar-header_container">
        <Header name={guildName} isChannelHeader={false} />
      </div>

      <div className="sidebar-children_container">
        <ActiveBackground />

        {categories.map(category => (
          <Fragment key={category.id}>
            <Category currentChannelID={currentChannelID as string} category={category} />
          </Fragment>
        ))}
      </div>
    </ChannelsSidebarWrapper>
  );
};
