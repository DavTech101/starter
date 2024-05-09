'use client';

import * as React from 'react';
import useIsMounted from '@hooks/useIsMounted';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

//##########################################################################################
// THEME PROVIDER
//##########################################################################################
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;
