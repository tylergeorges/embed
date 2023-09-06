import { useTranslation } from 'react-i18next';
import * as Styles from '@components/Overlays/Modal/GuestFormModal/styles';

interface GuestFormButtonProps {
  onClick: (e: React.SyntheticEvent) => void;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode | JSX.Element;
}

export const GuestFormButton = ({ onClick, disabled, label, children }: GuestFormButtonProps) => {
  const { t } = useTranslation();

  return (
    <Styles.GuestFormLoginButton
      size="full"
      type="submit"
      form="guest-user-form"
      onClick={onClick}
      disabled={disabled}
    >
      <Styles.GuestFormLoginButtonLabel>
        {children}
        {t(label)}
      </Styles.GuestFormLoginButtonLabel>
    </Styles.GuestFormLoginButton>
  );
};
