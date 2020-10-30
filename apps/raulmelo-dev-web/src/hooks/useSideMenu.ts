import { useState } from 'react';

export function useSideMenu() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return {
    isCollapsed,
    toggle: () => setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed),
    hide: () => setIsCollapsed(true),
    show: () => setIsCollapsed(false),
  };
}
