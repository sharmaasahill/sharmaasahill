import { FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';
import { toggleTheme } from '../lib/theme';

/**
 * Sun in the dark theme, moon in the light one. The label says what a click will do.
 * Both icons are rendered and CSS shows the right one from <html data-theme>, so the
 * prerendered page shows the correct icon before React knows the saved theme.
 */
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  const label = `Switch to the ${next} theme`;

  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggleTheme} aria-label={label} title={label}>
      <FiSun className="theme-toggle__sun" aria-hidden="true" />
      <FiMoon className="theme-toggle__moon" aria-hidden="true" />
    </button>
  );
}
