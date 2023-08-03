import { GuestFormInput } from '@components/Overlays/Modal/GuestFormModal/GuestFormInput';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { InformationModal } from '@components/Overlays/Modal/InformationModal';
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
          defaultValue={username}
          label="Display Name"
          placeholder="Guest"
          onInput={onInput}
          value={username}
          maxLength={80}
          minLength={1}
        />

        <Styles.GuestFormDiscordAuth>
          <Styles.GuestFormDiscordContent>
            Discord account?
            <Styles.GuestFormDiscordAuthButton onClick={discordSignIn}>
              {' '}
              Log in
            </Styles.GuestFormDiscordAuthButton>
          </Styles.GuestFormDiscordContent>
        </Styles.GuestFormDiscordAuth>
      </Styles.GuestFormWrapper>

      <Styles.GuestFormFooter>
        <Styles.GuestFormLoginButton
          type="submit"
          form="guest-user-form"
          onClick={submitForm}
          disabled={isButtonDisabled}
        >
          <Styles.GuestFormLoginButtonLabel>Login</Styles.GuestFormLoginButtonLabel>
        </Styles.GuestFormLoginButton>
      </Styles.GuestFormFooter>
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
    <InformationModal isOpen={showGuestFormModal} title="Create Guest Account" hideModal={hideForm}>
      <>
        <GuestForm hideForm={hideForm} />
      </>
    </InformationModal>
  );
};
