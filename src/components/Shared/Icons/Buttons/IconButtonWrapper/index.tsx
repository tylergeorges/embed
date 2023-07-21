import * as Styles from '@icons/Buttons/IconButtonWrapper/styles';
import ToolTip from '@components/Shared/ToolTip';
import IconButtonInner from './IconButtonInner';
import { IconButtonWrapperProps } from './button.types';

const IconButtonWrapper = ({
  tooltipLabel,
  children,
  tooltipDisabled,
  backgroundGlowSize,
  tooltipPlacement,
  onClick,
  isActive,
  tooltipDisabledIfActive,
  iconContent
}: IconButtonWrapperProps) => (
  <Styles.IconButtonRoot>
    {tooltipDisabled ? (
      <IconButtonInner
        onClick={onClick}
        backgroundGlowSize={backgroundGlowSize}
        isActive={isActive}
        iconContent={iconContent}
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

IconButtonWrapper.displayName = 'IconButtonWrapper';
IconButtonWrapper.whyDidYouRender = true;

export default IconButtonWrapper;
