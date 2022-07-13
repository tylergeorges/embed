import {memo, useMemo} from "react";
import {
  Message as MessageData,
  Message_interaction,
  Message_referencedMessage
} from "@generated";
import {
  MessageBase,
  MessageHeaderBase,
  MiniUserAvatarBase,
  MiniUserNameBase,
  ReplyInfoBase,
  ReplySpineBase,
  ReplyUserBase, SlashCommandBase,
  SmallTimestampBase
} from "@ui/Messages/Message/elements";
import MessageAuthor from "@ui/Messages/Message/MessageAuthor";
import Content from "@ui/Messages/Content";
import Moment from "moment";
import Tooltip from "rc-tooltip";
import {MessageType} from "@generated/globalTypes";
import getAvatar, {GetAvatarOptions} from "@utils/getAvatar";
import LargeTimestamp from "@ui/Messages/Message/LargeTimestamp";
import {authStore, generalStore} from "@store";

interface ReplyInfoProps {
  referencedMessage: Message_referencedMessage | null;
  interaction: Message_interaction | null;
}

function getMiniAvatarUrl(
  referencedMessage: Message_referencedMessage | null,
  interaction: Message_interaction | null
) {
  console.log("%c-- NormalMessage getMiniAvatarUrl", "color: yellow; font-size: 14px;");

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

function getMiniUserName(
  referencedMessage: Message_referencedMessage | null,
  interaction: Message_interaction | null
) {
  console.log("%c-- NormalMessage getMiniUserName", "color: yellow; font-size: 14px;");

  if (interaction !== null)
    return interaction.user.username;

  if (referencedMessage !== null)
    return referencedMessage.author.name;

  return null;
}

function getDominantRoleColor(
  referencedMessage: Message_referencedMessage | null
) {
  console.log("%c-- NormalMessage getDominantRoleColor", "color: yellow; font-size: 14px;");

  if (referencedMessage !== null) {
    const roleIds = referencedMessage.author.roles ?? [];
    const [role] = roleIds
      .map(id => generalStore.guild.roles.find(r => r.id === id))
      .filter(r => r !== undefined && r.color !== 0)
      .sort((a, b) => b.position - a.position);

    const colorHex = role?.color ?? null;
    return colorHex > 0
      ? `#${colorHex.toString(16).padStart(6, '0')}`
      : '#fff';
  }

  return null;
}

const ReplyInfo = memo((props: ReplyInfoProps) => {
  const miniAvatarUrl = useMemo(
    () => getMiniAvatarUrl(props.referencedMessage, props.interaction),
    [props.referencedMessage, props.interaction]
  );

  const miniUserName = useMemo(
    () => getMiniUserName(props.referencedMessage, props.interaction),
    [props.referencedMessage, props.interaction]
  );

  const miniUserNameColorHex = getDominantRoleColor(props.referencedMessage);

  return (
    <ReplyInfoBase>
      <ReplySpineBase />
      <ReplyUserBase>
        <MiniUserAvatarBase src={miniAvatarUrl} />
        <MiniUserNameBase color={miniUserNameColorHex}>
          {miniUserName}
        </MiniUserNameBase>
      </ReplyUserBase>
      {props.referencedMessage
        ? (
          <Content
            mentions={props.referencedMessage.mentions}
            messageContent={props.referencedMessage.content}
            editedAt={props.referencedMessage.editedAt}
            reactions={props.referencedMessage.reactions}
            attachments={props.referencedMessage.attachments}
            stickers={props.referencedMessage.stickers}
            messageType={props.referencedMessage.type}
            thread={null}
            isReplyContent={true}
          />
        )
        : (
          <SlashCommandBase.Base>
            used{" "}
            <Tooltip overlay={`/${props.interaction.name}`} placement="top" trigger={["click"]}>
              <SlashCommandBase.Command>/{props.interaction.name}</SlashCommandBase.Command>
            </Tooltip>
          </SlashCommandBase.Base>
        )
      }
    </ReplyInfoBase>
  );
});

type Message = Omit<MessageData, "referencedMessage"> & Partial<MessageData>;

interface MessageProps {
  isFirstMessage?: boolean;
  message: Message;
  isHovered?: boolean;
  noThreadButton?: boolean;
}

function NormalMessage(props: MessageProps) {
  console.log("%c NormalMessage render", "color: yellow; font-size: 16px;");

  const shouldShowReply = props.message.type === MessageType.Reply
                          || Boolean(props.message.interaction);

  const isUserMentioned = useMemo(() => {
    const user = authStore.user;

    if (!user)
      return false;

    if (!("_id" in user))
      return false;

    const userMentioned = props.message.mentions.find(
      mention => mention.id === user._id
    );

    return Boolean(userMentioned);
  }, [props.message.mentions]);

  if (props.isFirstMessage)
    return (
      <MessageBase isUserMentioned={isUserMentioned}>
        {shouldShowReply && (
          <ReplyInfo
            referencedMessage={props.message.referencedMessage}
            interaction={props.message.interaction}
          />
        )}
        <MessageHeaderBase>
          <MessageAuthor author={props.message.author} avatarAnimated={props.isHovered ?? false} />
          <LargeTimestamp timestamp={props.message.createdAt} />
        </MessageHeaderBase>
        <Content
          mentions={props.message.mentions}
          messageContent={props.message.content}
          editedAt={props.message.editedAt}
          reactions={props.message.reactions}
          attachments={props.message.attachments}
          stickers={props.message.stickers}
          thread={props.message.thread}
          messageType={props.message.type}
          noThreadButton={props.noThreadButton}
        />
      </MessageBase>
    );

  return (
    <MessageBase isUserMentioned={isUserMentioned}>
      <Tooltip
        placement="top"
        overlay={Moment(props.message.createdAt).format("LLLL")}
        mouseEnterDelay={1}
      >
        <SmallTimestampBase dateTime={props.message.createdAt} className="short-time">
          {Moment(props.message.createdAt).format("h:mm A")}
        </SmallTimestampBase>
      </Tooltip>
      <Content
        mentions={props.message.mentions}
        messageContent={props.message.content}
        editedAt={props.message.editedAt}
        reactions={props.message.reactions}
        attachments={props.message.attachments}
        stickers={props.message.stickers}
        thread={props.message.thread}
        messageType={props.message.type}
        noThreadButton={props.noThreadButton}
      />
    </MessageBase>
  );
}

export default NormalMessage;
