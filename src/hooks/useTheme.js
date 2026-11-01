import { useSyncExternalStore } from 'react';
import { getTheme, subscribe } from '../lib/theme';

/** The current theme, 'dark' or 'light'. Re-renders when it changes. */
export default function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'dark');
}
