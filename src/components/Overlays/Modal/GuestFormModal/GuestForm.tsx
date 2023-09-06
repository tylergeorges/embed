import { GuestFormButton } from '@components/Overlays/Modal/GuestFormModal/GuestFormButton';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { useAuthApi } from '@hooks/useAuthAPI';
import { useStoreActions } from '@state';
import { forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GuestFormInput } from './GuestFormInput';

interface GuestFormProps {
  hideForm: () => void;
}

export const GuestForm = forwardRef<HTMLInputElement, GuestFormProps>(({ hideForm }, ref) => {
  const { guestSignIn } = useAuthApi();
  const { t } = useTranslation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const isFetching = useRef(false);

  const inputRef = ref as React.MutableRefObject<HTMLInputElement>;

  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isButtonDisabled || isFetching.current || !inputRef) return;

    isFetching.current = true;

    guestSignIn(inputRef.current.value.trim())
      .then(() => {
        hideForm();
      })
      .catch(err => {
        console.error(err);
      });

    inputRef.current.value = '';
    isFetching.current = false;
    setShowGuestFormModal(false);
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const textValue = target.value;

    if (textValue.trim() && isButtonDisabled) {
      setIsButtonDisabled(false);
    } else if (!textValue.trim() && !isButtonDisabled) {
      setIsButtonDisabled(true);
    }
  };

  return (
    <Styles.GuestFormWrapper onSubmit={submitForm} id="guest-user-form">
      <GuestFormInput
        label={t('auth.name') as string}
        onInput={onInput}
        maxLength={80}
        minLength={1}
        color="light"
        ref={ref}
        type="text"
        autoFocus
      />

      <GuestFormButton label="auth.continue" onClick={submitForm} disabled={isButtonDisabled} />
    </Styles.GuestFormWrapper>
  );
});

GuestForm.displayName = 'GuestForm';
