import React from 'react';

import { canUseDOM, isDev } from './env';
import {
  DebuggableStyleInjector,
  NullStyleInjector,
  OptimizedStyleInjector,
  StyleInjector,
} from './StyleInjector';

export const StyleInjectorContext = React.createContext<StyleInjector>(
  // eslint-disable-next-line no-nested-ternary
  canUseDOM
    ? isDev
      ? new DebuggableStyleInjector()
      : new OptimizedStyleInjector()
    : new NullStyleInjector(),
);

export interface StyleInjectorProviderProps {
  children: React.ReactNode;
  injector: StyleInjector;
}

export function StyleInjectorProvider({
  children,
  injector,
}: StyleInjectorProviderProps): JSX.Element {
  return (
    <StyleInjectorContext.Provider value={injector}>
      {children}
    </StyleInjectorContext.Provider>
  );
}
