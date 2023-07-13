import { useRef } from 'react';

import { EmojisButton } from '@components/Shared/Icons/Buttons/EmojisButton';
import { TextBoxInput } from '@components/Core/TextChannelContainer/TextBox/TextBoxInput';
import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import * as Styles from '../styles';

interface TextBoxProps {
  channelIsThread?: boolean;
}

export const TextBox = ({ channelIsThread }: TextBoxProps) => {
  const fileAttachmentRef = useRef<HTMLInputElement>(null);

  const attachmentButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const fileAttachmentElement = fileAttachmentRef.current;

    if (fileAttachmentElement) {
      fileAttachmentElement.click();
    }
  };

  const addAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (files) {
      // TODO: implement adding file attachments
    }
  };

  return (
    <Styles.TextBoxWrapper>
      <Styles.TextBoxInner>
        <Styles.TextBoxButtonWrapper>
          <input hidden type="file" onChange={addAttachment} ref={fileAttachmentRef} />
          <IconButton
            tooltipDisabled
            onClick={attachmentButtonClick}
            isActive={false}
            icon="AddAttachment"
          />
        </Styles.TextBoxButtonWrapper>

        <TextBoxInput channelIsThread={channelIsThread} />

        <Styles.TextBoxButtonWrapper>
          <EmojisButton />
        </Styles.TextBoxButtonWrapper>
      </Styles.TextBoxInner>
    </Styles.TextBoxWrapper>
  );
};
