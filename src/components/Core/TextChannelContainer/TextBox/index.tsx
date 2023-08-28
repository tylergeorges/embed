import { useCallback, useRef } from 'react';

import { EmojisButton } from '@components/Shared/Icons/Buttons/EmojisButton';
import { TextBoxInput } from '@components/Core/TextChannelContainer/TextBox/TextBoxInput';
import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useSendMessage } from '@hooks/useSendMessage';
import { useAppRouter } from '@hooks/useAppRouter';
import * as Styles from '../styles';

interface TextBoxProps {
  isAuthed: boolean;
  canSend: boolean;
  scrollToBottom: ({ forceScroll }: { forceScroll?: boolean | undefined }) => void;
  channelIsThread?: boolean;
}

export const TextBox = ({ channelIsThread, canSend, isAuthed, scrollToBottom }: TextBoxProps) => {
  const fileAttachmentRef = useRef<HTMLInputElement>(null);
  const { threadId } = useAppRouter();

  const { sendMessage } = useSendMessage({
    thread: channelIsThread ? threadId : undefined,
    scrollToBottom
  });

  const attachmentButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const fileAttachmentElement = fileAttachmentRef.current;

    fileAttachmentElement?.click();
  };

  const addAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (files) {
      // TODO: implement adding file attachments
    }
  };

  const handleInputSubmit = useCallback(
    (content: string) => {
      sendMessage(content);
    },
    [sendMessage]
  );

  return (
    <Styles.TextBoxWrapper>
      <Styles.TextBoxForm id="text-box_form" canSend={canSend} isAuthed={isAuthed}>
        {canSend && isAuthed && (
          <Styles.TextBoxButtonWrapper>
            <input
              hidden
              type="file"
              onChange={addAttachment}
              ref={fileAttachmentRef}
              form="text-box_form"
            />

            <IconButton
              tooltipDisabled
              onClick={attachmentButtonClick}
              isActive={false}
              icon="AddAttachment"
            />
          </Styles.TextBoxButtonWrapper>
        )}

        <TextBoxInput
          channelIsThread={channelIsThread}
          handleInputSubmit={handleInputSubmit}
          isAuthed={isAuthed}
          canSend={canSend}
        />

        {canSend && isAuthed && (
          <Styles.TextBoxButtonWrapper>
            <EmojisButton />
          </Styles.TextBoxButtonWrapper>
        )}
      </Styles.TextBoxForm>
    </Styles.TextBoxWrapper>
  );
};
