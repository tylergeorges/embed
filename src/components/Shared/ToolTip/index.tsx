import * as Styles from '@components/Shared/ToolTip/styles';
import { useMediaQuery } from '@hooks/useMediaQuery';
import throttle from 'lodash.throttle';
import { useEffect, useRef, useState } from 'react';

interface ToolTipProps {
  label: string;

  children: ({ childRef }: { childRef: React.RefObject<HTMLDivElement> }) => React.ReactNode;

  placement: 'top' | 'bottom';

  tooltipEnabled?: boolean;
}

export const ToolTip = ({ label, children, placement, tooltipEnabled }: ToolTipProps) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const windowIsMobile = useMediaQuery();

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

  useEffect(() => {
    const childrenRef = childrenConRef.current;
    const tooltipElement = tooltipRef.current;

    const getTooltipPosition = () => {
      if (childrenRef && tooltipElement) {
        const childRect = childrenRef.getBoundingClientRect();
        const childLeft = childrenRef.clientLeft;

        const tooltipWidth = tooltipElement.offsetWidth;

        const tooltipOffscreen = childRect.x + tooltipElement.offsetWidth >= window.innerWidth;

        const tooltipYPos =
          placement === 'bottom'
            ? childrenRef.offsetTop + tooltipElement.clientHeight
            : childrenRef.clientTop - tooltipElement.clientHeight;

        if (tooltipOffscreen) {
          const tooltipXPos = childLeft + (window.innerWidth - childRect.x - tooltipWidth);

          tooltipElement.style.left = `${tooltipXPos}px`;
          tooltipElement.style.top = `${tooltipYPos}px`;
        } else {
          const tooltipXPos =
            childrenRef.offsetLeft - tooltipElement.offsetWidth / 2 + childrenRef.clientWidth / 2;

          tooltipElement.style.left = `${tooltipXPos}px`;
          tooltipElement.style.top = `${tooltipYPos}px`;
        }
      }
    };

    const throttledGetPos = throttle(() => {
      getTooltipPosition();
    }, 500);

    // Bounding client X position changes from initial render
    const getPosTimeout = setTimeout(() => {
      if (!visitedRef.current) {
        visitedRef.current = true;
        throttledGetPos();
      } else {
        clearTimeout(getPosTimeout);
      }
    }, 250);

    if (!windowIsMobile) {
      window.addEventListener('resize', throttledGetPos);
    }

    return () => {
      window.removeEventListener('resize', throttledGetPos);
      clearTimeout(getPosTimeout);
      throttledGetPos.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styles.ToolTipWrapper
      onTouchStart={undefined}
      onMouseEnter={!windowIsMobile ? openTooltip : undefined}
      onMouseLeave={!windowIsMobile ? hideTooltip : undefined}
    >
      <Styles.ToolTipChildWrapper>
        {children({ childRef: childrenConRef })}
      </Styles.ToolTipChildWrapper>

      <Styles.ToolTipContainer
        mobile={{
          '@initial': false,
          '@small': true
        }}
        visible={showToolTip}
        ref={tooltipRef}
      >
        <Styles.ToolTipContent>{label}</Styles.ToolTipContent>
      </Styles.ToolTipContainer>
    </Styles.ToolTipWrapper>
  );
};
