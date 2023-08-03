import { GuestFormInput } from '@components/Overlays/Modal/GuestFormModal/GuestFormInput';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import { useAuthAPI } from '@hooks/useAuthAPI';
import { useStoreActions, useStoreState } from '@state';
import { useCallback, useEffect, useRef, useState } from 'react';

interface GuestFormProps {
  receiveGuestMessage: (e: React.SyntheticEvent) => void;
  usernameRef: React.MutableRefObject<string>;
}

const GuestForm = ({ receiveGuestMessage, usernameRef }: GuestFormProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [localUsername, setLocalUsername] = useState('');
  const showGuestFormModal = useStoreState(state => state.ui.showGuestFormModal);

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLocalUsername(target.value);

    const userCanSubmit = !!target.value.trim();
    if (userCanSubmit && isButtonDisabled) {
      setIsButtonDisabled(false);
    } else if (!userCanSubmit && !isButtonDisabled) {
      setIsButtonDisabled(true);
    }
  };

  const submitCB = (e: React.SyntheticEvent) => {
    e.preventDefault();

    usernameRef.current = localUsername;
    receiveGuestMessage(e);
  };

  useEffect(() => {
    if (!showGuestFormModal) {
      setLocalUsername('');
    }

    if (!usernameRef.current.trim()) {
      setIsButtonDisabled(true);
    }
  }, [showGuestFormModal, usernameRef]);

  return (
    <>
      <Styles.GuestFormWrapper onSubmit={submitCB} id="guest-user-form">
        <GuestFormInput
          defaultValue={localUsername}
          label="Display Name"
          placeholder="Guest"
          onInput={onInput}
          value={localUsername}
        />
      </Styles.GuestFormWrapper>

      <Styles.GuestFormFooter>
        <Styles.GuestFormLoginButton onClick={submitCB}>
          <Styles.GuestFormLoginButtonLabel>Login</Styles.GuestFormLoginButtonLabel>
        </Styles.GuestFormLoginButton>
      </Styles.GuestFormFooter>
    </>
  );
};

export const GuestFormModal = () => {
  const inProgressRef = useRef(false);
  const usernameRef = useRef('');
  const { guestSignIn } = useAuthAPI();

  const showGuestFormModal = useStoreState(state => state.ui.showGuestFormModal);

  const setShowGuestFormModal = useStoreActions(state => state.ui.setShowGuestFormModal);

  const hideForm = () => {
    usernameRef.current = '';
    console.log(usernameRef.current);
    setShowGuestFormModal(false);
    // setUsername('');
    inProgressRef.current = false;
  };

  const receiveGuestMessage = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!inProgressRef.current) {
        inProgressRef.current = true;

        guestSignIn(usernameRef.current)
          .then(() => {
            usernameRef.current = '';
            inProgressRef.current = false;
            setShowGuestFormModal(false);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    [guestSignIn, setShowGuestFormModal]
  );

  return (
    <InformationModal isOpen={showGuestFormModal} title="Guest Form" hideModal={hideForm}>
      <GuestForm receiveGuestMessage={receiveGuestMessage} usernameRef={usernameRef} />
    </InformationModal>
  );
};
