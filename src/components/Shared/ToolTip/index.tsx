import {
  ToolTipWrapper,
  ToolTipContent,
  ToolTipContainer
} from '@components/Shared/ToolTip/elements';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedLeftValue = useMemo(() => left, []);

  const openToolTip = () => {
    setShowToolTip(true);
  };
  const hideToolTip = () => {
    setShowToolTip(false);
  };

  useEffect(() => {
    if (childrenConRef.current && tooltipRef.current && memoizedLeftValue === 0) {
      const tooltip = tooltipRef.current;
      const childrenCon = childrenConRef.current;
      const calcLeft = childrenCon.offsetLeft - tooltip.offsetWidth * 0.9;

      if (
        calcLeft >= window.innerWidth ||
        tooltip.clientWidth + tooltip.offsetLeft >= window.innerWidth
      ) {
        setLeft(calcLeft);
      }
    }
  }, [left, memoizedLeftValue]);

  return (
    <ToolTipWrapper
      className="tool-tip_wrapper"
      onTouchStart={undefined}
      onMouseEnter={openToolTip}
      onMouseLeave={hideToolTip}
    >
      <div ref={childrenConRef}>{children}</div>

      <ToolTipContainer
        className="tool-tip_container"
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
        <ToolTipContent className="tool-tip_content">{label}</ToolTipContent>
      </ToolTipContainer>
    </ToolTipWrapper>
  );
};
