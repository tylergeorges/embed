import { Modal } from '@components/Overlays/Modal';
import { GuestFormInput } from '@components/Overlays/Modal/GuestFormModal/GuestFormInput';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { useAuthApi } from '@hooks/useAuthAPI';
import { useStoreActions, useStoreState } from '@state';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GuestFormProps {
  hideForm: () => void;
}

const GuestForm = forwardRef<HTMLInputElement, GuestFormProps>(({ hideForm }, ref) => {
  const { guestSignIn, discordSignIn } = useAuthApi();
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
    <>
      <Styles.GuestFormWrapper onSubmit={submitForm} id="guest-user-form">
        <GuestFormInput
          label={t('auth.name') as string}
          onInput={onInput}
          maxLength={80}
          minLength={1}
          color="light"
          ref={ref}
          type="text"
        />

        <Styles.GuestFormLoginButton
          size="full"
          type="submit"
          form="guest-user-form"
          onClick={submitForm}
          disabled={isButtonDisabled}
        >
          <Styles.GuestFormLoginButtonLabel>{t('auth.continue')}</Styles.GuestFormLoginButtonLabel>
        </Styles.GuestFormLoginButton>
      </Styles.GuestFormWrapper>

      <Styles.GuestFormDiscordAuth>
        <Styles.GuestFormDiscordContent>
          {t('auth.discordacc')}
          <Styles.GuestFormDiscordAuthButton onClick={discordSignIn}>
            {' '}
            {t('auth.login2')}
          </Styles.GuestFormDiscordAuthButton>
        </Styles.GuestFormDiscordContent>
      </Styles.GuestFormDiscordAuth>
    </>
  );
});

GuestForm.displayName = 'GuestForm';

export const GuestFormModal = () => {
  const { t } = useTranslation();

  const isFetching = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showGuestFormModal = useStoreState(state => state.ui.showGuestFormModal);

  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const user = useStoreState(state => state.user.data);

  const hideForm = useCallback(() => {
    setShowGuestFormModal(false);

    if (inputRef.current) inputRef.current.value = '';

    isFetching.current = false;
  }, [setShowGuestFormModal, inputRef]);

  if (user) return null;

  return (
    <Modal
      isOpen={showGuestFormModal}
      title={t('auth.welcome')}
      subheader={t('auth.pickname') as string}
      hideModal={hideForm}
      titleSize="xxl"
      titleAlignment="center"
      containerSize="sm"
    >
      <GuestForm hideForm={hideForm} ref={inputRef} />
    </Modal>
  );
};
