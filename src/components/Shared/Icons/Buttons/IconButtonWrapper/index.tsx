import * as Styles from '@components/Shared/Icons/Buttons/IconButtonWrapper/styles';
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

  backgroundGlowSize?: number;
  isActive?: boolean;
}

export const IconButtonWrapper = ({
  tooltipLabel,
  children,
  alwaysShowTooltip,
  tooltipDisabled,
  backgroundGlowOnHover,
  backgroundGlowSize,
  tooltipPlacement,
  onClick,
  isActive
}: IconButtonWrapperProps) => {
  if (tooltipDisabled)
    return (
      <Styles.IconButtonRoot>
        <Styles.IconButtonChildrenWrapper
          backgroundGlowOnHover={backgroundGlowOnHover ?? false}
          onClick={onClick}
          isActive={isActive}
          css={
            backgroundGlowSize
              ? {
                  position: 'absolute',
                  width: backgroundGlowSize,
                  height: backgroundGlowSize
                }
              : {}
          }
        >
          {children}
        </Styles.IconButtonChildrenWrapper>
      </Styles.IconButtonRoot>
    );

  return (
    <Styles.IconButtonRoot>
      <ToolTip
        placement={tooltipPlacement ?? 'top'}
        label={tooltipLabel ?? ''}
        show={alwaysShowTooltip}
      >
        <Styles.IconButtonChildrenWrapper
          backgroundGlowOnHover={backgroundGlowOnHover ?? false}
          css={
            backgroundGlowSize
              ? {
                  width: backgroundGlowSize,
                  height: backgroundGlowSize
                }
              : {}
          }
          isActive={isActive}
          onClick={onClick}
        >
          {children}
        </Styles.IconButtonChildrenWrapper>
      </ToolTip>
    </Styles.IconButtonRoot>
  );
};
