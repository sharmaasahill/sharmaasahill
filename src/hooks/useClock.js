import { useEffect, useState } from 'react';

const formatter = (timeZone) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone });

const readTime = (timeZone) => formatter(timeZone).format(new Date());

/** Local time in `timeZone`, e.g. "11:04 PM". Re-renders once a minute, on the minute. */
export default function useClock(timeZone) {
  const [time, setTime] = useState(() => readTime(timeZone));

  useEffect(() => {
    let timer;
    const schedule = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000) + 50;
      timer = setTimeout(() => {
        setTime(readTime(timeZone));
        schedule();
      }, msToNextMinute);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [timeZone]);

  return time;
}
