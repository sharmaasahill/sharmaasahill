import { useCallback, useSyncExternalStore } from 'react';

const formatters = new Map();
const readTime = (timeZone) => {
  if (!formatters.has(timeZone)) {
    formatters.set(timeZone, new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone }));
  }
  return formatters.get(timeZone).format(new Date());
};

// Notify once a minute, on the minute.
function subscribe(notify) {
  let timer;
  const schedule = () => {
    timer = setTimeout(() => {
      notify();
      schedule();
    }, 60_000 - (Date.now() % 60_000) + 50);
  };
  schedule();
  return () => clearTimeout(timer);
}

/**
 * Local time in `timeZone`, e.g. "11:04 PM", updated on the minute.
 * The prerendered page has no time yet (''), so hydration matches; the real time follows at once.
 */
export default function useClock(timeZone) {
  const read = useCallback(() => readTime(timeZone), [timeZone]);
  return useSyncExternalStore(subscribe, read, () => '');
}
