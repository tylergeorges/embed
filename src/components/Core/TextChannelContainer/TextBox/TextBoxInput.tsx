import * as Styles from '@components/Core/TextChannelContainer/styles';
import { useStoreState } from '@state';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ModifierKeys = {
  Shift: {
    isHolding: boolean;
  };
  Control: {
    isHolding: boolean;
  };
};

interface TextBoxInputProps {
  canSend: boolean;
  handleInputSubmit: (content: string) => void;
  channelIsThread?: boolean;
}

const inputHeight = 21;

export const TextBoxInput = ({
  channelIsThread,
  handleInputSubmit,
  canSend
}: TextBoxInputProps) => {
  const { t } = useTranslation();
  const currentThread = useStoreState(state => state.guild.currentThread);
  const currentChannel = useStoreState(state => state.guild.currentChannel);

  const [modifierKeys, setModifierKeys] = useState<ModifierKeys>({
    Shift: { isHolding: false },
    Control: { isHolding: false }
  });

  const [content, setMessageContent] = useState('');

  const [showPlaceHolder, setShowPlaceholder] = useState(true);
  const [isCursorOnNewLine, setIsCursorOnNewLine] = useState(false);
  const [isAllContentSelected, setIsAllContentSelected] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.innerHTML = '';
      setShowPlaceholder(true);
      setMessageContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!['Shift', 'Enter', 'Backspace', 'a', 'Control'].includes(e.key)) return;

    const input = inputRef.current;

    if (!input) return;

    const { key } = e;

    const keyIsModifier = key === 'Shift' || key === 'Control';

    if (keyIsModifier) {
      if (modifierKeys[key].isHolding) return;

      setModifierKeys(prev => ({ ...prev, [key]: { isHolding: true } }));
    }

    if (key === 'a') {
      if (!isAllContentSelected) {
        setIsAllContentSelected(true);
      }
    }

    if (key === 'Enter') {
      const enterNewLine = key === 'Enter' && modifierKeys.Shift.isHolding;

      if (enterNewLine) {
        const currentInputHeight = input.clientHeight;

        input.style.height = `${currentInputHeight + inputHeight}px`;
        if (showPlaceHolder) {
          setShowPlaceholder(false);
          setIsCursorOnNewLine(true);
        }
      } else {
        //! Send message
        e.preventDefault();

        if (content.trim().length) {
          handleInputSubmit(content);
          clearInput();
        }
      }
    }

    if (key === 'Backspace') {
      let caretPos: number = 0;

      const sel = window.getSelection();

      if (isAllContentSelected) {
        setIsAllContentSelected(false);

        input.style.height = `21px`;
      }

      if (sel && sel.rangeCount) {
        const range = sel.getRangeAt(0);

        if (range.commonAncestorContainer.parentNode === input) {
          caretPos = range.endOffset;
        }
      }

      const currentInputHeight = input.getBoundingClientRect().height;

      if (currentInputHeight > 47) {
        if (caretPos === 0) {
          input.style.height = `${currentInputHeight - inputHeight}px`;
        }
      } else {
        setIsCursorOnNewLine(false);

        if (caretPos === 0) {
          setShowPlaceholder(true);
        }

        const canDeleteLine = currentInputHeight > inputHeight && caretPos === 0;

        if (canDeleteLine) {
          input.style.height = `${currentInputHeight - inputHeight}px`;
        }
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== 'Shift' && e.key !== 'Control') return;

    if (!modifierKeys[e.key].isHolding) return;

    setModifierKeys(prev => ({ ...prev, [e.key]: { isHolding: false } }));
  };

  const handleInputChange = (e: React.FormEvent) => {
    if (e.currentTarget.textContent) {
      setMessageContent(e.currentTarget?.textContent);
      setShowPlaceholder(false);
    } else if (!isCursorOnNewLine && !e.currentTarget.textContent) {
      setShowPlaceholder(true);
    }
  };

  const placeholder = canSend
    ? t('input.message', {
        CHANNEL: channelIsThread ? currentThread?.name : currentChannel?.name
      })
    : t('input.noperms');

  return (
    <Styles.TextBoxInputWrapper canSend={canSend}>
      <Styles.TextInput
        onKeyUp={handleKeyUp}
        contentEditable
        onKeyDown={handleKeyDown}
        onInput={handleInputChange}
        ref={inputRef}
        canSend={canSend}
        inputMode="text"
      />

      <input hidden type="text" form="text-box_form" value={content} />

      {showPlaceHolder && <Styles.TextBoxPlaceholder>{placeholder}</Styles.TextBoxPlaceholder>}
    </Styles.TextBoxInputWrapper>
  );
};
