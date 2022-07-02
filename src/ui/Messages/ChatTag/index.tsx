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

class ChatTag extends PureComponent<PureComponentProps> {
  render() {
    console.log(`%c ${this.props.userFlags}`, "color: cyan; font-size: 16px;");

    let tagContent;

    switch (this.props.userFlags) {
      case UserFlag.VerifiedBot:
        tagContent = <>{verified} {Locale.translate('tag.bot')}</>;
        break;
      default:
        return null;
    }

    return (
      <ChatTagBase>
        {tagContent}
      </ChatTagBase>
    );
  }
}

export default ChatTag;
