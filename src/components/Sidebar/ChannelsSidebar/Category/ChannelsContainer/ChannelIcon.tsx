import { ChannelType } from '@graphql/graphql';
import { Icons } from '@icons/index';

interface ChannelIconProps {
  channelType: ChannelType;
}

export const ChannelIcon = ({ channelType }: ChannelIconProps) => {
  switch (channelType) {
    case ChannelType.GuildText: {
      return <Icons icon="TextChannelHash" color="channel" size="small" />;
    }

    case ChannelType.GuildAnnouncement: {
      return <Icons icon="NewsChannelIcon" color="channel" size="small" />;
    }

    case ChannelType.GuildForum: {
      return <Icons icon="FourmChannelIcon" color="channel" size="small" />;
    }

    default: {
      return <Icons icon="TextChannelHash" color="channel" size="small" />;
    }
  }
};
