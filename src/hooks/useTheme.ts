import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only access theme on client side
  useEffect(() => setMounted(true), []);
  
  return {
    theme: mounted ? theme : undefined,
    resolvedTheme: mounted ? resolvedTheme : undefined,
    setTheme,
    isDark: mounted && (resolvedTheme === 'dark' || theme === 'dark')
  };
}; 