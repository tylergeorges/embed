import * as Styles from '@components/Shared/ToolTip/styles';
import { useEffect, useRef, useState } from 'react';

interface ToolTipProps {
  label: string;

  children: ({ childRef }: { childRef: React.RefObject<HTMLDivElement> }) => React.ReactNode;

  placement: 'top' | 'bottom';

  tooltipEnabled?: boolean;
}

export const ToolTip = ({ label, children, placement, tooltipEnabled }: ToolTipProps) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const visitedRef = useRef(false);

  const childrenConRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const openTooltip = () => {
    if (!tooltipEnabled) {
      setShowToolTip(false);
    } else {
      setShowToolTip(true);
    }
  };
  const hideTooltip = () => {
    setShowToolTip(false);
  };

  function getTooltipPosition() {
    const childrenRef = childrenConRef.current;
    const tooltipElement = tooltipRef.current;

    if (childrenRef && tooltipElement) {
      const childRect = childrenRef.getBoundingClientRect();
      const tooltipOffscreen = childRect.x + tooltipElement.offsetWidth >= window.innerWidth;

      if (tooltipOffscreen) {
        const newX =
          childrenRef.offsetLeft + (window.innerWidth - childRect.x - tooltipElement.clientWidth);

        tooltipElement.style.left = `${newX}px`;
      }
    }
  }
  useEffect(() => {
    // Bounding client X position changes from initial render
    const getPosTimeout = setTimeout(() => {
      if (!visitedRef.current) {
        visitedRef.current = true;
        getTooltipPosition();
      } else {
        clearTimeout(getPosTimeout);
      }
    }, 400);

    window.addEventListener('resize', getTooltipPosition);

    return () => {
      window.removeEventListener('resize', getTooltipPosition);
      clearTimeout(getPosTimeout);
    };
  }, []);

  return (
    <Styles.ToolTipWrapper
      onTouchStart={undefined}
      onMouseEnter={openTooltip}
      onMouseLeave={hideTooltip}
    >
      <Styles.ToolTipChildWrapper>
        {children({ childRef: childrenConRef })}
      </Styles.ToolTipChildWrapper>

      <Styles.ToolTipContainer visible={showToolTip} placement={placement} ref={tooltipRef}>
        <Styles.ToolTipContent>{label}</Styles.ToolTipContent>
      </Styles.ToolTipContainer>
    </Styles.ToolTipWrapper>
  );
};
