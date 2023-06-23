import {
  IconButtonRoot,
  IconButtonChildrenWrapper
} from '@components/Shared/Icons/Buttons/IconButtonWrapper/elements';
import { ToolTip } from '@components/Shared/ToolTip';

export interface IconButtonWrapperProps {
  onClick: (args: any) => void;
  children: React.ReactNode;
  tooltipLabel?: string;
  tooltipPlacement?: 'top' | 'bottom';
  tooltipDisabled?: boolean;
  /** Use when testing  */
  alwaysShowTooltip?: boolean;
  /** Illuminates a circle background on hover */
  backgroundGlowOnHover?: boolean;

  iconBackgroundSize?: number;
  isActive?: boolean;
}

export const IconButtonWrapper = ({
  tooltipLabel,
  children,
  alwaysShowTooltip,
  tooltipDisabled,
  backgroundGlowOnHover,
  iconBackgroundSize,
  tooltipPlacement,
  onClick,
  isActive
}: IconButtonWrapperProps) => {
  if (tooltipDisabled)
    return (
      <IconButtonRoot className="icon-button_wrapper_root">
        <IconButtonChildrenWrapper
          className="icon-button_children_wrapper"
          backgroundGlowOnHover={backgroundGlowOnHover ?? false}
          onClick={onClick}
          isActive={isActive}
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
      </IconButtonRoot>
    );

  return (
    <IconButtonRoot className="icon-button_wrapper_root">
      <ToolTip
        placement={tooltipPlacement ?? 'top'}
        label={tooltipLabel ?? ''}
        show={alwaysShowTooltip}
      >
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
          isActive={isActive}
          onClick={onClick}
        >
          {children}
        </IconButtonChildrenWrapper>
      </ToolTip>
    </IconButtonRoot>
  );
};
