import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';
import { ToolTip } from '@components/Shared/ToolTip';
import { IconButtonInner } from './IconButtonInner';
import { IconButtonWrapperProps } from './button.types';

export const IconButtonWrapper = ({
  tooltipLabel,
  children,
  tooltipDisabled,
  backgroundGlowSize,
  tooltipPlacement,
  onClick,
  isActive,
  tooltipDisabledIfActive,
  iconContent,
  backgroundGlowRadii
}: IconButtonWrapperProps) => (
  <Styles.IconButtonRoot>
    {tooltipDisabled ? (
      <IconButtonInner
        onClick={onClick}
        backgroundGlowSize={backgroundGlowSize}
        isActive={isActive}
        iconContent={iconContent}
        backgroundGlowRadii={backgroundGlowRadii}
      >
        {children}
      </IconButtonInner>
    ) : (
      <ToolTip
        placement={tooltipPlacement ?? 'bottom'}
        label={tooltipLabel ?? ''}
        tooltipEnabled={tooltipDisabledIfActive ? !isActive : true}
      >
        {({ childRef }) => (
          <IconButtonInner
            onClick={onClick}
            backgroundGlowSize={backgroundGlowSize}
            backgroundGlowRadii={backgroundGlowRadii}
            isActive={isActive}
            iconContent={iconContent}
          >
            <div ref={childRef}>{children}</div>
          </IconButtonInner>
        )}
      </ToolTip>
    )}
  </Styles.IconButtonRoot>
);
