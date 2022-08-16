import * as React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { store } from "@models";
import { generalStore } from "@store";

type Props = Partial<NavLinkProps> & {
  id: string;
  $ref?: any;
};

const toggle = () => window.innerWidth < 520 ? store.sidebar.toggle() : null

class ChannelLink extends React.PureComponent<Props> {
  render() {
    const { id, $ref, children, className } = this.props;
    return (
      <NavLink
        to={`/channels/${generalStore.guild?.id}/${id}`}
        data-channel={id}
        ref={$ref}
        onClick={toggle}
        children={children}
        className={className}
        style={{ textDecoration: 'unset'}}
      />
    );
  }
}

export default ChannelLink;
