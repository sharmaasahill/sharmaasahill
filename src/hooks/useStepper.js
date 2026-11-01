import { useCallback, useEffect, useState } from 'react';

/**
 * Walks through `count` steps, one every `interval` ms, while `running` is true.
 * `select(i)` jumps to a step and holds it there until `release()`.
 */
export default function useStepper(count, { interval = 3600, running = true } = {}) {
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!running || held) return undefined;
    const timer = setTimeout(() => setStep((s) => (s + 1) % count), interval);
    return () => clearTimeout(timer);
  }, [step, running, held, count, interval]);

  const select = useCallback((i) => {
    setStep(i);
    setHeld(true);
  }, []);
  const release = useCallback(() => setHeld(false), []);

  return { step, held, select, release };
}
