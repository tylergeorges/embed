import { forwardRef } from 'react';
import * as Styles from './styles';

interface GuestFormInputProps extends React.ComponentProps<typeof Styles.GuestFormInputRoot> {
  label?: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const GuestFormInput = forwardRef<HTMLInputElement, GuestFormInputProps>(
  ({ label, onInput, ...props }, ref) => (
    <Styles.GuestFormInputWrapper>
      {label && <Styles.GuestFormInputLabel>{label}</Styles.GuestFormInputLabel>}
      <Styles.GuestFormInputRoot {...props} onInput={onInput} ref={ref} />
    </Styles.GuestFormInputWrapper>
  )
);

GuestFormInput.displayName = 'GuestFormInput';
