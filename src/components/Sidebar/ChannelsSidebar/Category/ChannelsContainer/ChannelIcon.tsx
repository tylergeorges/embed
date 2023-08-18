import { ChannelType } from '@graphql/graphql';
import { Icons } from '@icons/index';

interface ChannelIconProps {
  channelType: ChannelType;
}

export const ChannelIcon = ({ channelType }: ChannelIconProps) => {
  switch (channelType) {
    case ChannelType.GuildText: {
      return <Icons icon="TextChannelHash" color="dark" size="sm" />;
    }

    case ChannelType.GuildAnnouncement: {
      return <Icons icon="NewsChannelIcon" color="dark" size="sm" />;
    }

    case ChannelType.GuildForum: {
      return <Icons icon="FourmChannelIcon" color="dark" size="sm" />;
    }

    default: {
      return <Icons icon="TextChannelHash" color="dark" size="sm" />;
    }
  }
};
