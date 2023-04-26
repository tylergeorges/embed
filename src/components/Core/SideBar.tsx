import { Wrapper } from '@/components/Core';
import { Header } from '@/components/Header/Header';

interface SideBarProps {
  /** Name to display in header. */
  header_name: string;

  /** Background color for the SideBar */
  sidebar_color: string;

  children: JSX.Element[];
}

/** Reusable SideBar component. */
export const SideBar = ({ header_name, sidebar_color, children }: SideBarProps) => (
  <Wrapper
    style={{
      justifyContent: 'center',
      backgroundColor: sidebar_color,
      minWidth: 200,
      maxWidth: 200
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <Header header_name={header_name} isChannelHeader={false} />
    </div>

    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
      }}
    >
      {children}
    </div>
  </Wrapper>
);
