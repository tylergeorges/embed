import { channel, mention, role } from '@ui/shared/markdown/render/ast/mention'
import text from '@ui/shared/markdown/render/ast/text'
import { defaultRules, inlineRegex } from 'simple-markdown'
import { useNavigate } from "react-router-dom";

import { customEmoji } from './customEmoji'
import {Link} from "@ui/shared/markdown/render/elements";
import {useMessages} from "@hooks";

const baseRules = {
  messageLink: {
    order: defaultRules.url.order,
    match: inlineRegex(/https:\/\/discord\.com\/channels\/([0-9]+)\/([0-9]+)\/([0-9]+)/),
    parse: ([whole, guildId, channelId, messageId]) => ({
      whole,
      guildId,
      channelId,
      messageId,
    }),
    react: (node, recurseOutput, state) => {
      const { fetchMore } = useMessages(node.channelId, node.guildId);
      const navigate = useNavigate();

      return (
        <Link
          key={state.key}
          href={"javascript:void(0)"}
          onClick={() => {
            navigate(`/channels/${node.guildId}/${node.channelId}`);
            fetchMore({around: node.messageId}, true);
          }}
        >
          {node.whole}
        </Link>
      )
    }
  },

  newline: defaultRules.newline,
  paragraph: defaultRules.paragraph,
  escape: defaultRules.escape,
  link: defaultRules.link,
  url: defaultRules.url,
  strong: defaultRules.strong,
  em: defaultRules.em,
  u: defaultRules.u,
  br: defaultRules.br,
  inlineCode: defaultRules.inlineCode,

  autolink: {
    ...defaultRules.autolink,
    match: inlineRegex(/^<(https?:\/\/[^ >]+)>/)
  },
  blockQuote: {
    ...defaultRules.blockQuote,
    match: (source, {prevCapture}) => /^$|\n *$/.test(prevCapture ?? '') ? /^( *>>> +([\s\S]*))|^( *>(?!>>) +[^\n]*(\n *>(?!>>) +[^\n]*)*\n?)/.exec(source) : null,
    parse: (capture, parse, state) => ({content: parse(capture[0].replace(/^ *>(?:>>)? ?/gm, ''), state)})
  },
  emoticon: {
    order: defaultRules.text.order,
    match: source => /^(¯\\_\(ツ\)_\/¯)/.exec(source),
    parse: capture => ({ type: 'text', content: capture[1] })
  },
  codeBlock: {
    order: defaultRules.codeBlock.order,
    match: source => /^```(([A-z0-9-]+?)\n+)?\n*([^]+?)\n*```/.exec(source),
    parse: ([, , lang, content]) => ({
      lang: (lang || '').trim(),
      content: content || ''
    })
  },
  customEmoji,
  text,

  mention,
  channel,
  role,

  s: {
    order: defaultRules.u.order,
    match: inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
    parse: defaultRules.u.parse
  },

  spoiler: {
    order: defaultRules.inlineCode.order + 1,
    match: inlineRegex(/^\|\|([\s\S]+?)\|\|/),
    parse: defaultRules.strong.parse
  },

  timestamp: {
    order: defaultRules.u.order,
    // https://github.com/discordjs/discord-api-types/blob/638c347dd8a1c5dc39b3626c76749c5f8a4afc6a/globals.ts#L69
    match: inlineRegex(/^<t:(?<timestamp>-?\d{1,13})(:(?<style>[tTdDfFR]))?>/),
    parse: ({groups}) => groups
  }
}

export default baseRules
