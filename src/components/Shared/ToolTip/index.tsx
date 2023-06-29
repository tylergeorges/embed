import * as Styles from '@components/Shared/ToolTip/styles';
import { useEffect, useRef, useState } from 'react';

interface ToolTipProps {
  label: string;
  children: React.ReactNode;
  placement: 'top' | 'bottom';
  /** Use when testing */
  show?: boolean;
}

export const ToolTip = ({ label, children, placement, show }: ToolTipProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const childrenConRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [visited, setVisited] = useState(false);

  const openToolTip = () => {
    setShowToolTip(true);
  };
  const hideToolTip = () => {
    setShowToolTip(false);
  };

  useEffect(() => {
    const childrenRef = childrenConRef.current;
    const tooltipElement = tooltipRef.current;

    if (childrenRef && tooltipElement && !visited) {
      setVisited(true);

      const tooltipFor = childrenRef.getBoundingClientRect();
      const labelX = Math.floor(tooltipFor.x + tooltipElement.offsetWidth);

      const isTooltipOffscreen = labelX >= window.innerWidth;

      if (isTooltipOffscreen && left === 0 && !visited) {
        const moveAmount = labelX - window.innerWidth;
        setLeft(tooltipElement.offsetLeft - moveAmount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  return (
    <Styles.ToolTipWrapper
      className="tooltip-wrapper"
      onTouchStart={undefined}
      onMouseEnter={openToolTip}
      onMouseLeave={hideToolTip}
    >
      <div ref={childrenConRef}>{children}</div>

      <Styles.ToolTipContainer
        className="tooltip-container"
        visible={show || showToolTip}
        placement={placement}
        ref={tooltipRef}
        css={
          left !== 0
            ? {
                left
              }
            : {}
        }
      >
        <Styles.ToolTipContent className="tooltip-content">{label}</Styles.ToolTipContent>
      </Styles.ToolTipContainer>
    </Styles.ToolTipWrapper>
  );
};
