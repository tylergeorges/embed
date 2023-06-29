import { useCallback, useRef } from 'react';

import { AddAttachmentsButton } from '@components/Shared/Icons/Buttons/AddAttachmentsButton';
import { EmojisButton } from '@components/Shared/Icons/Buttons/EmojisButton';
import { TextBoxInput } from '@components/Core/TextChannelContainer/TextBox/TextBoxInput';
import * as Styles from '../styles';

export const TextBox = () => {
  const imageAttachmentRef = useRef<HTMLInputElement>(null);
  const attachmentButtonClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    imageAttachmentRef.current?.click();
  }, []);

  const addAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      // TODO: implement adding attachments
    }
  };

  return (
    <Styles.TextBoxWrapper className="textbox-wrapper">
      <Styles.TextBoxInner>
        <Styles.TextBoxButtonWrapper>
          <input hidden type="file" onChange={addAttachment} ref={imageAttachmentRef} />
          <AddAttachmentsButton onClick={attachmentButtonClick} />
        </Styles.TextBoxButtonWrapper>

        <TextBoxInput />

        <Styles.TextBoxButtonWrapper>
          <EmojisButton />
        </Styles.TextBoxButtonWrapper>
      </Styles.TextBoxInner>
    </Styles.TextBoxWrapper>
  );
};
