import { Modal } from '@components/Overlays/Modal';
import { GuestFormInput } from '@components/Overlays/Modal/GuestFormModal/GuestFormInput';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { useAuthAPI } from '@hooks/useAuthAPI';
import { useStoreActions, useStoreState } from '@state';
import { useCallback, useEffect, useRef, useState } from 'react';

interface GuestFormProps {
  hideForm: () => void;
}

const GuestForm = ({ hideForm }: GuestFormProps) => {
  const { guestSignIn, discordSignIn } = useAuthAPI();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const isFetching = useRef(false);

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
    <>
      <Styles.GuestFormWrapper onSubmit={submitForm} id="guest-user-form">
        <GuestFormInput
          label="Name"
          onInput={onInput}
          value={username}
          maxLength={80}
          minLength={1}
          color="light"
        />

        <Styles.GuestFormLoginButton
          size="full"
          type="submit"
          form="guest-user-form"
          onClick={submitForm}
          disabled={isButtonDisabled}
        >
          <Styles.GuestFormLoginButtonLabel>Continue</Styles.GuestFormLoginButtonLabel>
        </Styles.GuestFormLoginButton>
      </Styles.GuestFormWrapper>

      <Styles.GuestFormDiscordAuth>
        <Styles.GuestFormDiscordContent>
          Discord account?
          <Styles.GuestFormDiscordAuthButton onClick={discordSignIn}>
            {' '}
            Log in
          </Styles.GuestFormDiscordAuthButton>
        </Styles.GuestFormDiscordContent>
      </Styles.GuestFormDiscordAuth>
    </>
  );
};

export const GuestFormModal = () => {
  const isFetching = useRef(false);

  const showGuestFormModal = useStoreState(state => state.ui.showGuestFormModal);

  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const user = useStoreState(state => state.user.data);

  const hasUser = !!user;

  const hideForm = useCallback(() => {
    setShowGuestFormModal(false);

    isFetching.current = false;
  }, [setShowGuestFormModal]);

  if (hasUser) return null;

  return (
    <Modal
      isOpen={showGuestFormModal}
      title="Welcome!"
      subheader="Pick a name to start chatting"
      hideModal={hideForm}
      titleSize="xxl"
      titleAlignment="center"
      containerSize="sm"
    >
      <GuestForm hideForm={hideForm} />
    </Modal>
  );
};
