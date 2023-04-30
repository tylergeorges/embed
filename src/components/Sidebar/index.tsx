import { Header } from '@components/Header/Header';
import { Root } from '@components/SideBar/elements';

interface SideBarProps {
  /** Name to display in header. */
  header_name: string;

  /** Background color for the SideBar */
  sidebar_color: string;

  children: React.ReactNode;
}

/** Reusable SideBar component. */
export const SideBar = ({ header_name, sidebar_color, children }: SideBarProps) => (
  <Root
    style={{
      backgroundColor: sidebar_color
    }}
  >
    <div className="sidebar-header_container">
      <Header header_name={header_name} isChannelHeader={false} />
    </div>

    <div className="sidebar-children_container">{children}</div>
  </Root>
);
