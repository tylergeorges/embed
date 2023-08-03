import * as Styles from './styles';

interface GuestFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const GuestFormInput = ({ label, onInput, ...props }: GuestFormInputProps) => (
  <Styles.GuestFormInputWrapper>
    {label && <Styles.GuestFormInputLabel>{label}</Styles.GuestFormInputLabel>}
    <Styles.GuestFormInputRoot {...props} onChange={onInput} />
  </Styles.GuestFormInputWrapper>
);
