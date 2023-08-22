import { Modal } from '@components/Overlays/Modal';
import { GuestFormInput } from '@components/Overlays/Modal/GuestFormModal/GuestFormInput';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { useAuthApi } from '@hooks/useAuthAPI';
import { useStoreActions, useStoreState } from '@state';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GuestFormButtonProps {
  onClick: (e: React.SyntheticEvent) => void;
  label: string;
  disabled?: boolean;
}

const GuestFormButton = ({ label, onClick, disabled }: GuestFormButtonProps) => {
  const { t } = useTranslation();

  return (
    <Styles.GuestFormLoginButton
      size="full"
      type="submit"
      form="guest-user-form"
      onClick={onClick}
      disabled={disabled}
    >
      <Styles.GuestFormLoginButtonLabel>{t(label)}</Styles.GuestFormLoginButtonLabel>
    </Styles.GuestFormLoginButton>
  );
};

interface GuestFormProps {
  hideForm: () => void;
}

const GuestForm = ({ hideForm }: GuestFormProps) => {
  const { guestSignIn } = useAuthApi();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [username, setUsername] = useState('');

  const isFetching = useRef(false);

  const { t } = useTranslation();

  const showGuestFormModal = useStoreState(state => state.ui.showGuestFormModal);
  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  useEffect(() => {
    if (!showGuestFormModal) {
      setUsername('');
    }

    if (!username.trim()) {
      setIsButtonDisabled(true);
    }
  }, [username, showGuestFormModal]);

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isButtonDisabled || isFetching.current) return;

    isFetching.current = true;

    guestSignIn(username)
      .then(() => {
        hideForm();
      })
      .catch(err => {
        console.error(err);
      });

    setUsername('');
    isFetching.current = false;
    setShowGuestFormModal(false);
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setUsername(target.value);

    const userCanSubmit = !!target.value.trim();

    if (userCanSubmit && isButtonDisabled) {
      setIsButtonDisabled(false);
    } else if (!userCanSubmit && !isButtonDisabled) {
      setIsButtonDisabled(true);
    }
  };

  return (
    <Styles.GuestFormWrapper onSubmit={submitForm} id="guest-user-form">
      <GuestFormInput
        label={t('auth.name') as string}
        onInput={onInput}
        value={username}
        maxLength={80}
        minLength={1}
        color="light"
      />

      <GuestFormButton disabled={isButtonDisabled} label="auth.continue" onClick={submitForm} />
    </Styles.GuestFormWrapper>
  );
};

const GuestFormDiscordAuth = () => {
  const { t } = useTranslation();

  const { discordSignIn } = useAuthApi();

  return (
    <Styles.GuestFormDiscordAuth>
      <Styles.GuestFormDiscordContent>
        {t('auth.discordacc')}

        <Styles.GuestFormDiscordAuthButton onClick={discordSignIn}>
          {' '}
          {t('auth.login2')}
        </Styles.GuestFormDiscordAuthButton>
      </Styles.GuestFormDiscordContent>
    </Styles.GuestFormDiscordAuth>
  );
};

export const GuestFormModal = () => {
  const isFetching = useRef(false);

  const { t } = useTranslation();

  const user = useStoreState(state => state.user.data);
  const showGuestFormModal = useStoreState(state => state.ui.showGuestFormModal);

  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const hideForm = useCallback(() => {
    setShowGuestFormModal(false);

    isFetching.current = false;
  }, [setShowGuestFormModal]);

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
      <GuestForm hideForm={hideForm} />

      <GuestFormDiscordAuth />
    </Modal>
  );
};
