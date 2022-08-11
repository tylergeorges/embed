import { useRouter, useSendMessage } from '@hooks'
import Input from './Input'
import { Field, PushDown, Root, Blocked, UnblockButton } from './elements'
import { useState, useRef, FunctionComponent } from 'react'
import { authStore, generalStore } from "@store";
import { observer } from 'mobx-react'
import { useMutation } from "react-apollo-hooks";
import BLOCK_USER from "@ui/Modal/screens/Profile/BlockUser.graphql";

// this is a copy of Chat.tsx for direct chats

export const DirectChat: FunctionComponent = observer((props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sendMessage = useSendMessage();
  const [rows, setRows] = useState(1);
  const { channel } = useRouter();

  const chat = generalStore.chats?.find(c => c.recipient.id === channel.substring(1));

  const isBlocked = chat && authStore.blockedUsers.includes(chat.recipient.id);

  const blockUser = useMutation<boolean>(BLOCK_USER);

  const unblockUser = async () => {
    await blockUser({
      variables: { user: chat.recipient.id, active: false },
    });

    const newBlockedUsers = authStore.blockedUsers.filter(r => r !== chat.recipient.id);

    authStore.setBlockedUsers(newBlockedUsers);
  };

  return (
    <>
      <PushDown />
      <Root className="chat">
        {isBlocked ?
          <Blocked>
            <p>You can not send messages to a user you have blocked.</p>

            <UnblockButton type="button" onClick={unblockUser}>
              Unblock
            </UnblockButton>
          </Blocked>
          : <Field rows={rows} canSend={true} className="field">
            <Input
              channel={{ name: chat?.recipient.name, canSend: true, direct: true }}
              onChange={(value: string) => {
                const rows = value.split(/\r\n|\r|\n/).length;
                setRows(rows)
              }}
              onSubmit={async (content: string) => {
                if (content.length === 0) return

                content = content.replace(/:([^\s:]+?):/g, (match, name) => {
                  const result = generalStore.emojis.get(name)
                  return result
                    ? result.category === 'custom'
                      ? `<${result.animated ? 'a' : ''}:${result.keywords[0]}:${result.emoji}>`
                      : result.emoji
                    : match
                })

                if (content.startsWith('/')) {
                  const words = content.split(' ')
                  const command = words.shift().substring(1)
                  if (['shrug', 'tableflip', 'unflip', 'me', 'spoiler'].includes(command)) {
                    content = words.join(' ')

                    if (['me', 'spoiler'].includes(command) && !content) return

                    switch (command) {
                      case 'shrug':
                        content += ' ¯\\_(ツ)_/¯';
                        break;
                      case 'tableflip':
                        content += ' (╯°□°）╯︵ ┻━┻';
                        break;
                      case 'unflip':
                        content += ' ┬─┬ ノ( ゜-゜ノ)';
                        break;
                      case 'me':
                        content = `_${content}_`;
                        break;
                      case 'spoiler':
                        content = `||${content}||`;
                        break;
                    }
                  }
                }

                // TODO: Clear the input field only when the user is signed in, otherwise they lose their message
                inputRef.current.value = ''

                await sendMessage(content)
              }}
              innerRef={ref => (inputRef.current = ref)}
              innerProps={{
                placeholder: `Message ${chat?.recipient.name ? '@' + chat.recipient.name : 'user'}`
              }}
            />

            {/*<Emoji />*/}
          </Field>
        }
      </Root>
    </>
  );
})
