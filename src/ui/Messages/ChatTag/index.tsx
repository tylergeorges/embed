import Tooltip from "rc-tooltip";
import * as React from "react";
import {Locale} from "@lib/Locale";
import {ChatTagBase, VerifiedBot} from "@ui/Messages/ChatTag/elements";

enum UserFlag {
  VerifiedSystem = 1 << 12,
  VerifiedBot = 1 << 16,
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

  if (userFlags & UserFlag.VerifiedSystem)
    return <>{verified} {Locale.translate('tag.system')}</>;

  return <>{Locale.translate('tag.bot')}</>;
}

interface ChatTagProps {
  userFlags: number;
}

function ChatTag({userFlags}: ChatTagProps) {
  console.log(`%c flags: ${userFlags}`, "color: cyan; font-size: 16px;");

  return (
    <ChatTagBase>
      <Tag userFlags={userFlags} />
    </ChatTagBase>
  );
}

export default ChatTag;
