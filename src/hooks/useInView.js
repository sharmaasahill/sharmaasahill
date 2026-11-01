import { useEffect, useState } from 'react';

/**
 * True while the referenced element is on screen. Used to pause decorative animation.
 * With `once`, it stays true after the first time the element is seen.
 */
export default function useInView(ref, rootMargin = '0px', { once = false } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
