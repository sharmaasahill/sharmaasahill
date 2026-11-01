import { FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';
import { toggleTheme } from '../lib/theme';

/** Sun in the dark theme, moon in the light one. The label says what a click will do. */
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  const label = `Switch to the ${next} theme`;

  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggleTheme} aria-label={label} title={label}>
      {theme === 'light' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
    </button>
  );
}
