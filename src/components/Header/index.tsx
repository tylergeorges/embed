import {
  GuildHeader,
  GuildHeaderName,
  HeaderChannel,
  HeaderChannelNameWrapper,
  HeaderRoot,
  Stretch,
  TextChannelHeaderDesc,
  TextChannelHeaderName
} from '@components/Header/elements';
import { MembersIcon } from '@components/Header/MembersIcon';
import { useStoreActions } from '@state';
import { Hamburger } from './Hamburger/index';

export interface HeaderProps {
  /** Name to display in header. */
  name: string;

  /** If the header should have a drop shadow or not.
   *
   * Drop shadow is disabled by default.
   */
  shadowEnabled?: boolean;

  /** If the header we are going to render is a text channel name, doing this
   *  to hide the hash for non channels.
   */
  isChannelHeader: boolean;

  channel_description?: string;
}

/** Reusable Header component. */
export const Header = ({
  name,
  shadowEnabled,
  isChannelHeader,
  channel_description
}: HeaderProps) => {
  const setShowInfoModal = useStoreActions(state => state.ui.setShowInfoModal);

  const openInfoModal = () => {
    setShowInfoModal(true);
  };
  return (
    <HeaderRoot shadowEnabled={shadowEnabled} className="header-root">
      {isChannelHeader ? (
        // If this is a header for a text channel
        <HeaderChannel className="text-channel_header">
          <HeaderChannelNameWrapper
            role="dialog"
            aria-modal="true"
            className="text-channel_header_name_container"
          >
            <Hamburger />
            <Stretch
              css={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                overflow: 'hidden',
                wordBreak: 'break-word',
                flexShrink: 1,
                flexGrow: 1
              }}
            >
              {/* <Hash /> */}
              <TextChannelHeaderName className="text-channel_header_name">
                {name}
              </TextChannelHeaderName>
              <TextChannelHeaderDesc
                className="text-channel_header_description"
                onClick={openInfoModal}
              >
                {channel_description}
              </TextChannelHeaderDesc>
            </Stretch>
          </HeaderChannelNameWrapper>

          <div>
            <MembersIcon />
          </div>
        </HeaderChannel>
      ) : (
        <GuildHeader className="guild-header">
          <GuildHeaderName className="guild-header_name">{name}</GuildHeaderName>
        </GuildHeader>
      )}
    </HeaderRoot>
  );
};
