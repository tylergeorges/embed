import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';
import { ComponentProps } from 'react';

export type IconButtonWrapperProps = ComponentProps<typeof Styles.IconButtonChildrenWrapper> &
  ComponentProps<typeof Styles.IconButtonRoot> & {
    onClick: (args: any) => void;

    children: React.ReactNode;

    tooltipLabel?: string;

    tooltipPlacement?: 'top' | 'bottom';

    tooltipDisabled?: boolean;

    iconContent?: string | null;

    isActive?: boolean;

    tooltipDisabledIfActive?: boolean;
  };
