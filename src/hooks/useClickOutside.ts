import { useEffect, useRef } from 'react';

interface UseClickOutsideProps {
  isFocused: boolean;

  onClickOutside: () => void;

  includeElement: HTMLElement | null;
}

export const useClickOutside = ({
  isFocused,
  onClickOutside,
  includeElement
}: UseClickOutsideProps) => {
  const focusElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusElement = focusElementRef.current;

    const onWindowClick = (e: MouseEvent) => {
      const nodeTarget = e.target as Node;

      if (focusElement && isFocused && includeElement) {
        const isClickedOutside =
          !focusElement.contains(nodeTarget) && !includeElement.contains(nodeTarget);

        if (isClickedOutside) {
          onClickOutside();
        }
      }
    };

    if (focusElement && includeElement) {
      window.addEventListener('click', onWindowClick);
    }

    return () => {
      if (focusElement && includeElement) {
        window.removeEventListener('click', onWindowClick);
      }
    };
  }, [onClickOutside, isFocused, includeElement]);

  return { focusElementRef };
};
