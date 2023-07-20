import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';

export interface IconButtonWrapperProps
  extends React.ComponentProps<typeof Styles.IconButtonChildrenWrapper> {
  onClick: (args: any) => void;

  children: React.ReactNode;

  tooltipLabel?: string;

  tooltipPlacement?: 'top' | 'bottom';

  tooltipDisabled?: boolean;

  isActive?: boolean;

  iconContent?: string | null;

  tooltipDisabledIfActive?: boolean;
}
