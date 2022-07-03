import {PureComponent} from "react";
import Tooltip from "rc-tooltip";
import * as React from "react";
import {Locale} from "@lib/Locale";
import {ChatTagBase, VerifiedBot} from "@ui/Messages/ChatTag/elements";

interface PureComponentProps {
  userFlags: number;
}

enum UserFlag {
  VerifiedBot = 1 << 16
}

const verified =
  <Tooltip placement="top" overlay="Verified Bot">
    <VerifiedBot aria-label="Verified Bot" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
      <path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
    </VerifiedBot>
  </Tooltip>

function Tag({userFlags}: {userFlags: number}) {
  if (userFlags & UserFlag.VerifiedBot)
    return <>{verified} {Locale.translate('tag.bot')}</>;

  return <>{Locale.translate('tag.bot')}</>;
}

class ChatTag extends PureComponent<PureComponentProps> {
  render() {
    console.log(`%c flags: ${this.props.userFlags}`, "color: cyan; font-size: 16px;");

    return (
      <ChatTagBase>
        <Tag userFlags={this.props.userFlags} />
      </ChatTagBase>
    );
  }
}

export default ChatTag;
