import { Root, Stretch } from '@components/Header';
import { Hash } from '@components/Shared/Channel/elements';

export interface HeaderProps {
  /** Name to display in header. */
  header_name: string;

  /** If the header should have a box-shadow or not.
   *
   * Shadow is disabled by default.
   */
  shadowEnabled?: boolean;

  /** If the header we are going to render is a text channel name, doing this
   * to hide the hash for non channels.
   */
  isChannelHeader: boolean;
}

/** Reusable Header component. */
export const Header = ({ header_name, shadowEnabled, isChannelHeader }: HeaderProps) => (
  <Root
    style={
      shadowEnabled
        ? {
            boxShadow:
              '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)',
            backgroundColor: 'transparent',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }
        : {
            backgroundColor: 'transparent'
          }
    }
  >
    {isChannelHeader ? (
      <Stretch
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          marginLeft: 15
        }}
      >
        <Hash style={{ width: 20, height: 20 }} />
        <p style={{ fontWeight: 'bold', fontSize: 18 }}>{header_name}</p>
      </Stretch>
    ) : (
      <Stretch>
        <p style={{ fontWeight: 'bold', fontSize: 18 }}>{header_name}</p>
      </Stretch>
    )}
  </Root>
);
