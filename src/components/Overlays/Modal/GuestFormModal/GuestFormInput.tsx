import * as Styles from './styles';

interface GuestFormInputProps extends React.ComponentProps<typeof Styles.GuestFormInputRoot> {
  label?: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const GuestFormInput = ({ label, onInput, ...props }: GuestFormInputProps) => (
  <Styles.GuestFormInputWrapper>
    {label && <Styles.GuestFormInputLabel>{label}</Styles.GuestFormInputLabel>}
    <Styles.GuestFormInputRoot {...props} onInput={onInput} />
  </Styles.GuestFormInputWrapper>
);
