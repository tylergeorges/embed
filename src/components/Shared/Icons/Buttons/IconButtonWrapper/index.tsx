import * as Styles from '@components/Shared/Icons/Buttons/IconButtonWrapper/styles';
import { ToolTip } from '@components/Shared/ToolTip';
import { theme } from '@stitches';

export interface IconButtonWrapperProps {
  onClick: (args: any) => void;

  children: React.ReactNode;

  tooltipLabel?: string;

  tooltipPlacement?: 'top' | 'bottom';

  tooltipDisabled?: boolean;

  /** Illuminates a circle background on hover */
  backgroundGlowOnHover?: boolean;

  backgroundGlowSize?: number;

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
  backgroundGlowOnHover,
  backgroundGlowSize,
  tooltipPlacement,
  onClick,
  isActive,
  tooltipDisabledIfActive,
  iconContent
}: IconButtonWrapperProps) => {
  if (tooltipDisabled) {
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
            backgroundGlowOnHover={backgroundGlowOnHover ?? false}
            onClick={onClick}
            isActive={isActive}
            css={
              backgroundGlowSize
                ? {
                    width: backgroundGlowSize,
                    height: backgroundGlowSize,
                    borderRadius: theme.radii.round
                  }
                : {}
            }
          >
            <div ref={childRef}>{children}</div>
            {iconContent && <IconContent content={iconContent} />}
          </Styles.IconButtonChildrenWrapper>
        )}
      </ToolTip>
    </Styles.IconButtonRoot>
  );
};
