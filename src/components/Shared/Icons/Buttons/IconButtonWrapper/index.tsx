import * as Styles from '@components/Shared/Icons/Buttons/IconButtonWrapper/styles';
import { ToolTip } from '@components/Shared/ToolTip';

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

const IconContent = ({ content }: { content: string }) => (
  <Styles.IconButtonContentWrapper>{content}</Styles.IconButtonContentWrapper>
);

export const IconButtonWrapper = ({
  tooltipLabel,
  children,
  tooltipDisabled,
  backgroundGlowSize,
  tooltipPlacement,
  onClick,
  isActive,
  tooltipDisabledIfActive,
  iconContent
}: IconButtonWrapperProps) => {
  // Style for if the background glow should be a certain size

  if (tooltipDisabled) {
    return (
      <Styles.IconButtonRoot>
        <Styles.IconButtonChildrenWrapper
          onClick={onClick}
          backgroundGlowSize={backgroundGlowSize}
          isActive={isActive}
        >
          <div>{children}</div>
          {iconContent && <IconContent content={iconContent} />}
        </Styles.IconButtonChildrenWrapper>
      </Styles.IconButtonRoot>
    );
  }

  return (
    <Styles.IconButtonRoot>
      <ToolTip
        placement={tooltipPlacement ?? 'top'}
        label={tooltipLabel ?? ''}
        tooltipEnabled={tooltipDisabledIfActive ? !isActive : true}
      >
        {({ childRef }) => (
          <Styles.IconButtonChildrenWrapper
            backgroundGlowSize={backgroundGlowSize}
            onClick={onClick}
            isActive={isActive}
          >
            <div ref={childRef}>{children}</div>
            {iconContent && <IconContent content={iconContent} />}
          </Styles.IconButtonChildrenWrapper>
        )}
      </ToolTip>
    </Styles.IconButtonRoot>
  );
};
