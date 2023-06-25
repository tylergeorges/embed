import {
  TextInput,
  TextBoxPlaceholder,
  TextBoxInputWrapper
} from '@components/Core/TextChannelContainer/elements';
import { useStoreState } from '@state';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ModifierKeys = {
  Shift: {
    isHolding: boolean;
  };
  Control: {
    isHolding: boolean;
  };
};

export const TextBoxInput = () => {
  const translate = useTranslation();
  const currentChannel = useStoreState(state => state.guild.currentChannel);
  const [modifierKeys, setModifierKeys] = useState<ModifierKeys>({
    Shift: { isHolding: false },
    Control: { isHolding: false }
  });
  const channelName = useMemo(
    () => translate.t('input.message', { CHANNEL: currentChannel?.name }),
    [translate, currentChannel]
  );
  // @ts-ignore
  const [, setMessageContent] = useState('');

  const [showPlaceHolder, setShowPlaceholder] = useState(true);
  const [isCursorOnNewLine, setIsCursorOnNewLine] = useState(false);
  const [isAllContentSelected, setIsAllContentSelected] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key !== 'Shift' &&
      e.key !== 'Enter' &&
      e.key !== 'Backspace' &&
      e.key !== 'a' &&
      e.key !== 'Control'
    )
      return;

    const { key } = e;

    if (key === 'Shift' || key === 'Control') {
      if (modifierKeys[key] && modifierKeys[key].isHolding) return;

      setModifierKeys(prev => ({ ...prev, [key]: { isHolding: true } }));
    }

    if (key === 'a') {
      if (!isAllContentSelected) {
        setIsAllContentSelected(true);
      }
    }

    if (key === 'Enter' && modifierKeys.Shift.isHolding) {
      if (inputRef.current) {
        const currentInputHeight = inputRef.current?.clientHeight;
        const inputHeight = 21;
        inputRef.current.style.height = `${currentInputHeight + inputHeight}px`;
        // setCursorPos();
        if (showPlaceHolder) {
          setShowPlaceholder(false);
          setIsCursorOnNewLine(true);
        }
      }
    }

    if (key === 'Backspace') {
      let caretPos: number = 0;

      if (window.getSelection) {
        const sel = window.getSelection();
        if (isAllContentSelected && inputRef.current) {
          setIsAllContentSelected(false);

          inputRef.current.style.height = `21px`;
        }

        if (sel?.rangeCount) {
          const range = sel.getRangeAt(0);
          if (range.commonAncestorContainer.parentNode === inputRef.current) {
            caretPos = range.endOffset;
          }
        }
      }

      if (inputRef.current) {
        const currentInputHeight = inputRef.current.getBoundingClientRect().height;
        const inputHeight = 21;
        if (currentInputHeight > 47) {
          if (caretPos === 0) {
            inputRef.current.style.height = `${currentInputHeight - inputHeight}px`;
          }
        } else {
          setIsCursorOnNewLine(false);
          if (caretPos === 0) {
            setShowPlaceholder(true);
          }
          if (currentInputHeight > inputHeight && caretPos === 0) {
            inputRef.current.style.height = `${currentInputHeight - inputHeight}px`;
          }
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

  return (
    <TextBoxInputWrapper>
      <TextInput
        onKeyUp={handleKeyUp}
        className="textbox-input"
        contentEditable
        onKeyDown={handleKeyDown}
        onInput={handleInputChange}
        ref={inputRef}
        inputMode="text"
      />

      {showPlaceHolder && <TextBoxPlaceholder>{channelName}</TextBoxPlaceholder>}
    </TextBoxInputWrapper>
  );
};
