import * as React from "react";
import {PureComponent} from "react";
import {
  AuthorBase,
  AvatarBase,
  UsernameBase
} from "@ui/Messages/Message/elements";
import {
  GuildInfo_guild_roles,
  Message_author
} from "@generated";
import {memoize} from "lodash";
import ChatTag from "@ui/Messages/ChatTag";
import {generalStore} from "@store";
import RoleIcon from "@ui/Messages/Message/RoleIcon";
import getAvatar from "@utils/getAvatar";
import { store } from "@models";

interface MessageAuthorProps {
  author: Message_author;
  avatarAnimated?: boolean;
  onlyShowUsername?: boolean;
  isGuest?: boolean;
}

class MessageAuthor extends PureComponent<MessageAuthorProps> {
  private convertColor = memoize(
    (color: number) =>
      color > 0 ? `#${color.toString(16).padStart(6, '0')}` : undefined
  );

  private getDominantRoleColor = memoize(
    (roleIds: string[] | null): number | null => {
      if (roleIds === null) return null;

      const [role] = roleIds
        .map(id => generalStore.guild.roles.find(r => r.id === id))
        .filter(r => r !== undefined && r.color !== 0)
        .sort((a, b) => b.position - a.position);

      return role?.color ?? null;
    }
  );

  private getDominantRoleIconRole = memoize(
    (roleIds: string[] | null): GuildInfo_guild_roles | null => {
      if (roleIds === null) return null;

      const [role] = roleIds
        .map(id => generalStore.guild.roles.find(r => r.id === id))
        .filter(r => r !== undefined && (r.icon !== null || r.unicodeEmoji !== null))
        .sort((a, b) => b.position - a.position);

      // Fall back to null if the role is undefined.
      // This can happen if the role wasn't provided with the guild, but was on the user
      // or no role the user has had an icon or unicode emoji.
      return role ?? null;
    }
  );

  render() {
    // Gets the dominant role color
    const dominantRoleColor = this.getDominantRoleColor(this.props.author.roles);
    const color = this.convertColor(dominantRoleColor ?? 0);

    // Gets the dominant role icon
    const dominantRoleIconRole = this.getDominantRoleIconRole(this.props.author.roles);

    let nameRef: HTMLDivElement;

    const username = <UsernameBase
      color={color}
      innerRef={ref => nameRef = ref}
      onClick={() => store.modal.openProfile(
        this.props.author.id,
        this.props.author.name,
        this.props.author.discrim,
        this.props.author.avatarUrl,
        this.props.author.bot,
        this.props.author.flags,
        this.props.isGuest,
        nameRef.getBoundingClientRect().right + 10,
        Math.min(nameRef.getBoundingClientRect().y, innerHeight - 250)
      )}
    >
      {this.props.author.name}
    </UsernameBase>

    if (this.props.onlyShowUsername)
      return (
        <AuthorBase>
          {username}
        </AuthorBase>
      );

    return (
      <AuthorBase>
        <AvatarBase
          src={getAvatar(this.props.author, {animated: this.props.avatarAnimated ?? false})}
          draggable={false}
        />
        {username}
        {dominantRoleIconRole !== null && (
          <RoleIcon role={dominantRoleIconRole} />
        )}
        {this.props.author.bot && (
          <ChatTag userFlags={this.props.author.flags} isGuest={this.props.isGuest} />
        )}
      </AuthorBase>
    );
  }
}

export default MessageAuthor;
