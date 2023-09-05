import { useEffect, useRef } from 'react';

export const useClickOutside = (isFocused: boolean) => {
  const focusElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusElement = focusElementRef.current;

    if (isFocused && focusElement) {
      focusElement.focus();
    }
  }, [isFocused]);

  return { focusElementRef };
};
