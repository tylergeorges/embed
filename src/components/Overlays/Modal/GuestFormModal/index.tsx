import { Modal } from '@components/Overlays/Modal';
import { GuestForm } from '@components/Overlays/Modal/GuestFormModal/GuestForm';
import { GuestFormButton } from '@components/Overlays/Modal/GuestFormModal/GuestFormButton';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';
import { useAuthApi } from '@hooks/useAuthAPI';
import { useStoreActions, useStoreState } from '@state';
import { svgUrls } from '@svg-assets';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const DiscordIcon = () => (
  <Styles.DiscordIconWrapper height={24} width={24} viewBox="0 0 24 24">
    <use href={`${svgUrls.DiscordIcon}#svg`} />
  </Styles.DiscordIconWrapper>
);

const GuestFormDiscordAuth = () => {
  const { discordSignIn } = useAuthApi();

  return (
    <GuestFormButton onClick={discordSignIn} label="Sign in with discord">
      <DiscordIcon />
    </GuestFormButton>
  );
};

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

      <GuestFormDiscordAuth />
    </Modal>
  );
};
