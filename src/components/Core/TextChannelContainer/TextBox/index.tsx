import { memo, useCallback, useRef } from 'react';

import { EmojisButton } from '@components/Shared/Icons/Buttons/EmojisButton';
import { TextBoxInput } from '@components/Core/TextChannelContainer/TextBox/TextBoxInput';
import IconButton from '@components/Shared/Icons/Buttons/IconButton';
import * as Styles from '../styles';

interface TextBoxProps {
  channelIsThread?: boolean;
}

export const TextBox = memo(({ channelIsThread }: TextBoxProps) => {
  const fileAttachmentRef = useRef<HTMLInputElement>(null);

  const attachmentButtonClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();

    const fileAttachmentElement = fileAttachmentRef.current;

    fileAttachmentElement?.click();
  }, []);

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
});

TextBox.displayName = 'TextBox';
TextBox.whyDidYouRender = true;
