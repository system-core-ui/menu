import { useEffect, useRef, useCallback } from 'react';

const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

export const useMenuKeyboard = (containerRef: React.RefObject<HTMLDivElement>) => {
  const typeaheadBufferRef = useRef('');
  const typeaheadTimeoutRef = useRef<number | null>(null);

  const getItems = useCallback(() => {
    if (!containerRef.current) return [];
    const all = Array.from(
      containerRef.current.querySelectorAll(ITEM_SELECTOR)
    ) as HTMLElement[];
    // Loại bỏ items nằm trong collapsed sub-menu
    return all.filter(
      (el) => el.closest('[role="menu"][data-collapsed="true"]') === null
    );
  }, [containerRef]);

  const setFocus = useCallback((item: HTMLElement) => {
    getItems().forEach((el) => {
      el.tabIndex = -1;
    });
    item.tabIndex = 0;
    item.focus();
  }, [getItems]);

  // Initialization: set first item's tabIndex to 0
  useEffect(() => {
    const items = getItems();
    if (items.length > 0) {
      const activeItem = items.find((el) => el.tabIndex === 0) || items[0];
      activeItem.tabIndex = 0;
    }
  }, [getItems]);

  // Handle focus when clicking or tabbing to Menu
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (e.target === container) {
        const items = getItems();
        if (items.length > 0) {
          const focusTarget = items.find((el) => el.tabIndex === 0) || items[0];
          setFocus(focusTarget);
        }
      }
    };

    container.addEventListener('focusin', handleFocusIn);
    return () => container.removeEventListener('focusin', handleFocusIn);
  }, [containerRef, getItems, setFocus]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const items = getItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocus(items[(currentIndex + 1) % items.length]);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocus(items[(currentIndex - 1 + items.length) % items.length]);
        break;
      case 'Home':
        e.preventDefault();
        setFocus(items[0]);
        break;
      case 'End':
        e.preventDefault();
        setFocus(items[items.length - 1]);
        break;
      default:
        // Typeahead
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          e.stopPropagation();

          if (typeaheadTimeoutRef.current) {
            clearTimeout(typeaheadTimeoutRef.current);
          }

          typeaheadBufferRef.current += e.key.toLowerCase();
          
          const match = items.find((el) => {
            const text = el.textContent?.trim().toLowerCase() || '';
            return text.startsWith(typeaheadBufferRef.current);
          });

          if (match) {
            setFocus(match);
          }

          typeaheadTimeoutRef.current = window.setTimeout(() => {
            typeaheadBufferRef.current = '';
          }, 500);
        }
        break;
    }
  }, [getItems, setFocus]);

  return { onKeyDown };
};
