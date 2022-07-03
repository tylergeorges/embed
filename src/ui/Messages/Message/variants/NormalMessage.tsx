import {PureComponent} from "react";
import {
  Message as MessageData,
  Message_interaction,
  Message_referencedMessage
} from "@generated";
import {
  LargeTimestampBase,
  MessageBase,
  MessageHeaderBase, MiniUserAvatarBase, MiniUserNameBase,
  ReplyInfoBase,
  ReplySpine,
  ReplyUserBase,
  SmallTimestampBase
} from "@ui/Messages/Message/elements";
import MessageAuthor from "@ui/Messages/Message/MessageAuthor";
import Content from "@ui/Messages/Content";
import Moment from "moment";
import Tooltip from "rc-tooltip";
import {memoize} from "lodash";
import {MessageType} from "@generated/globalTypes";
import getAvatar, {GetAvatarOptions} from "@utils/getAvatar";
import {generalStore} from "@store";

interface MessageProps {
  isFirstMessage?: boolean;
  message: MessageData;
}

interface MessageState {
  isHovering: boolean;
}

class NormalMessage extends PureComponent<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super(props);

    this.state = {
      isHovering: false
    };
  }

  private shouldShowReplySpine = memoize(
    (messageType: MessageType, interaction: Message_interaction | null) => {
      return messageType === MessageType.Reply || Boolean(interaction);
    }
  )

  private convertColor = memoize(
    (color: number) =>
      color > 0 ? `#${color.toString(16).padStart(6, '0')}` : 'fff'
  );

  private getDominantRoleColor = memoize(
    (roleIds: string[] | null): number | null => {
      if (roleIds === null) return null;

      const [role] = roleIds
        .map(id => generalStore.guild.roles.find(r => r.id === id))
        .filter(r => r !== undefined && r.color !== 0)
        .sort((a, b) => b.position - a.position);

      return role?.color ?? 0;
    }
  );

  private getMiniAvatarUrl = memoize(
    (referencedMessage: Message_referencedMessage | null, interaction: Message_interaction | null) => {
      const getAvatarSettings: GetAvatarOptions = {
        size: 16,
        animated: false
      }

      if (interaction !== null)
        return getAvatar(interaction.user, getAvatarSettings);

      if (referencedMessage !== null)
        return getAvatar(referencedMessage.author, getAvatarSettings);

      return null;
    }
  );


  private getMiniUserName = memoize(
    (referencedMessage: Message_referencedMessage | null, interaction: Message_interaction | null) => {
      if (interaction !== null)
        return interaction.user.username;

      if (referencedMessage !== null)
        return referencedMessage.author.name;

      return null;
    }
  );

  render() {
    console.log("%c Message render", "color: yellow; font-size: 16px;");
    const showReplySpine = this.shouldShowReplySpine(
      this.props.message.type,
      this.props.message.interaction
    );

    const miniAvatarUrl = this.getMiniAvatarUrl(
      this.props.message.referencedMessage,
      this.props.message.interaction
    );

    const miniUserName = this.getMiniUserName(
      this.props.message.referencedMessage,
      this.props.message.interaction
    );

    const miniUserNameColor = this.props.message.referencedMessage
      ? this.getDominantRoleColor(
          this.props.message.referencedMessage.author.roles
        )
      : 0;
    const miniUserNameColorHex = this.convertColor(miniUserNameColor);

    if (this.props.isFirstMessage)
      return (
        <MessageBase
          onMouseEnter={() => this.setState({isHovering: true})}
          onMouseLeave={() => this.setState({isHovering: false})}
        >
          {showReplySpine && (
            <ReplyInfoBase>
              <ReplySpine />
              <ReplyUserBase>
                <MiniUserAvatarBase src={miniAvatarUrl} />
                <MiniUserNameBase color={miniUserNameColorHex}>
                  {miniUserName}
                </MiniUserNameBase>
              </ReplyUserBase>
              {this.props.message.referencedMessage
                ? (
                  <Content
                    mentions={this.props.message.referencedMessage.mentions}
                    messageContent={this.props.message.referencedMessage.content}
                    isReplyContent={true}
                  />
                )
                : (
                  <>used /idk</>
                )
              }
            </ReplyInfoBase>
          )}
          <MessageHeaderBase>
            <MessageAuthor author={this.props.message.author} avatarAnimated={this.state.isHovering} />
            <Tooltip
              placement="top"
              overlay={Moment(this.props.message.createdAt).format("LLLL")}
              mouseEnterDelay={1}
            >
              <LargeTimestampBase dateTime={this.props.message.createdAt}>
                {Moment(this.props.message.createdAt).calendar()}
              </LargeTimestampBase>
            </Tooltip>
          </MessageHeaderBase>
          <Content
            mentions={this.props.message.mentions}
            messageContent={this.props.message.content}
          />
        </MessageBase>
      );

    return (
      <MessageBase>
        <Tooltip
          placement="top"
          overlay={Moment(this.props.message.createdAt).format("LLLL")}
          mouseEnterDelay={1}
        >
          <SmallTimestampBase dateTime={this.props.message.createdAt} className="short-time">
            {Moment(this.props.message.createdAt).format("h:mm A")}
          </SmallTimestampBase>
        </Tooltip>
        <Content
          mentions={this.props.message.mentions}
          messageContent={this.props.message.content}
        />
      </MessageBase>
    )
  }
}

export default NormalMessage;
