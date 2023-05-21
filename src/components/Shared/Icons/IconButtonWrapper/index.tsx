import { IconButtonRoot } from '@components/Shared/Icons/IconButtonWrapper/elements';
import { ToolTip } from '@components/Shared/ToolTip';

interface IconButtonWrapperProps {
  button_label: string;
  /** Use when testing  */
  showTooltip?: boolean;
  children: React.ReactNode;
}

export const IconButtonWrapper = ({
  button_label,
  children,
  showTooltip
}: IconButtonWrapperProps) => (
  <IconButtonRoot>
    <ToolTip placement="bottom" label={button_label} show={showTooltip}>
      {children}
    </ToolTip>
  </IconButtonRoot>
);
