import {
  IconButtonRoot,
  IconButtonChildrenWrapper
} from '@components/Shared/Icons/Buttons/IconButtonWrapper/elements';
import { ToolTip } from '@components/Shared/ToolTip';

interface IconButtonWrapperProps {
  button_label: string;
  children: React.ReactNode;
  tooltipPlacement: 'top' | 'bottom';
  /** Use when testing  */
  showTooltip?: boolean;
  /** Illuminates a circle background on hover */
  backgroundGlowOnHover?: boolean;

  iconBackgroundSize?: number;
}

export const IconButtonWrapper = ({
  button_label,
  children,
  showTooltip,
  backgroundGlowOnHover,
  iconBackgroundSize,
  tooltipPlacement
}: IconButtonWrapperProps) => (
  <IconButtonRoot className="icon-button_wrapper_root">
    <ToolTip placement={tooltipPlacement} label={button_label} show={showTooltip}>
      <IconButtonChildrenWrapper
        className="icon-button_children_wrapper"
        backgroundGlowOnHover={backgroundGlowOnHover ?? false}
        css={
          iconBackgroundSize
            ? {
                width: iconBackgroundSize,
                height: iconBackgroundSize
              }
            : {}
        }
      >
        {children}
      </IconButtonChildrenWrapper>
    </ToolTip>
  </IconButtonRoot>
);
