import * as Styles from '@components/Core/TextChannelContainer/styles';
import { useAuthApi } from '@hooks/useAuthAPI';
import { useStoreActions, useStoreState } from '@state';
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
  isAuthed: boolean;
  channelIsThread?: boolean;
}

const getPlaceholder = (isAuthed: boolean, canSend: boolean) => {
  if (!isAuthed) {
    return 'input.login';
  }

  if (canSend) {
    return 'input.message';
  }

  return 'input.noperms';
};

export const TextBoxInput = ({
  channelIsThread,
  handleInputSubmit,
  canSend,
  isAuthed
}: TextBoxInputProps) => {
  const { t } = useTranslation();
  const { discordSignIn } = useAuthApi();
  const currentThread = useStoreState(state => state.guild.currentThread);
  const currentChannel = useStoreState(state => state.guild.currentChannel);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);
  const guildSettings = useStoreState(state => state.guild.settings);

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
      inputRef.current.textContent = '';

      setShowPlaceholder(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!['Shift', 'Enter', 'Backspace', 'a', 'Control'].includes(e.key)) return;

    const { key } = e;

    switch (key) {
      case 'Shift':
      case 'Control': {
        if (modifierKeys[key].isHolding) break;

        setModifierKeys(prev => ({ ...prev, [key]: { isHolding: true } }));

        break;
      }

      case 'Enter': {
        const enterNewLine = modifierKeys.Shift.isHolding;

        if (enterNewLine) {
          if (showPlaceHolder) {
            setShowPlaceholder(false);
          }
        } else {
          //! Send message
          e.preventDefault();

          const content = inputRef.current?.innerText.trim();

          if (content && content.length <= 2000) {
            handleInputSubmit(content);
            clearInput();
          }
        }

        break;
      }

      case 'Backspace': {
        if (isAllContentSelected) {
          clearInput();
          setShowPlaceholder(true);
          setIsAllContentSelected(false);
        }

        break;
      }

      case 'a': {
        if (!isAllContentSelected && modifierKeys.Control.isHolding) {
          setIsAllContentSelected(true);
        }

        break;
      }

      default: {
        break;
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== 'Control' && e.key !== 'Shift') return;
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

  // Prevent user from pasting formatted/stylized text
  const sanitizePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const text = e.clipboardData.getData('text/plain');

    document.execCommand('insertText', false, text);

    if (showPlaceHolder) {
      setShowPlaceholder(false);
    }
  };

  const showGuestForm = () => {
    if (!isAuthed && !guildSettings?.readonly) {
      if (guildSettings?.guestMode) {
        setShowGuestFormModal(true);
      } else {
        discordSignIn();
      }
    }
  };

  const placeholderOptions =
    canSend && isAuthed
      ? {
          CHANNEL: channelIsThread ? currentThread?.name : currentChannel?.name
        }
      : {};

  const placeholder = t(getPlaceholder(isAuthed, canSend), placeholderOptions);

  return (
    <Styles.TextBoxInputWrapper
      canSend={canSend}
      isAuthed={isAuthed}
      onClick={isAuthed ? undefined : showGuestForm}
    >
      <Styles.TextInput
        onKeyUp={handleKeyUp}
        onPaste={sanitizePaste}
        onKeyDown={handleKeyDown}
        onInput={handleInputChange}
        ref={inputRef}
        canSend={canSend}
        inputMode="text"
        contentEditable
      />

      {showPlaceHolder && <Styles.TextBoxPlaceholder>{placeholder}</Styles.TextBoxPlaceholder>}
    </Styles.TextBoxInputWrapper>
  );
};
