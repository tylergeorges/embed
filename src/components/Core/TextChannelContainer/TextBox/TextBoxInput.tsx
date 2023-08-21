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

  const [showPlaceHolder, setShowPlaceholder] = useState(true);
  const [isAllContentSelected, setIsAllContentSelected] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.innerHTML = '';
      inputRef.current.innerText = '';

      setShowPlaceholder(true);
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

    if (key === 'a' && modifierKeys.Control.isHolding) {
      if (!isAllContentSelected) {
        setIsAllContentSelected(true);
      }
    }

    if (key === 'Enter') {
      const enterNewLine = modifierKeys.Shift.isHolding;

      if (enterNewLine) {
        if (showPlaceHolder) {
          setShowPlaceholder(false);
        }
      } else {
        //! Send message
        e.preventDefault();

        const content = inputRef.current.innerText.trim();

        console.log(content.length);
        if (content && content.length <= 2000) {
          console.log(content, content.length);

          handleInputSubmit(content);
          clearInput();
        }
      }
    }

    if (key === 'Backspace') {
      if (isAllContentSelected) {
        clearInput();

        setIsAllContentSelected(false);
      }

      if (!showPlaceHolder) {
        setShowPlaceholder(true);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== 'Shift' && e.key !== 'Control') return;

    if (!modifierKeys[e.key].isHolding) return;

    setModifierKeys(prev => ({ ...prev, [e.key]: { isHolding: false } }));
  };

  const handleInputChange = (e: React.FormEvent) => {
    if (showPlaceHolder) {
      setShowPlaceholder(false);
    } else if (!e.currentTarget.textContent && !showPlaceHolder) {
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

      {showPlaceHolder && <Styles.TextBoxPlaceholder>{placeholder}</Styles.TextBoxPlaceholder>}
    </Styles.TextBoxInputWrapper>
  );
};
