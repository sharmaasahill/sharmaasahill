/*
 * Scroll reveals, replacing GSAP's ScrollTrigger.batch with one IntersectionObserver.
 *
 * Elements marked `data-reveal` fade up and `data-lines` headlines slide out of their masks
 * (CSS: "Motion" in index.css). Nothing is hidden until this runs and adds `.reveals` to
 * <html>, so the prerendered page reads fine before or without JavaScript. Anything already
 * on screen or scrolled past at that moment is marked `data-in` straight away, so it never
 * blinks out. The rest get `data-in` as they cross 92% of the viewport height; elements that
 * arrive together are staggered.
 *
 * `data-in` is set on the DOM directly. React never renders that attribute, so re-renders
 * leave it alone.
 */

const SELECTOR = '[data-reveal]:not([data-in]), [data-lines]:not([data-in])';
const STAGGER_MS = 70;
const MAX_DELAY_MS = 420;
const LINE = 0.92; // fraction of the viewport height an element's top must pass

export function startReveals() {
  const root = document.documentElement;
  if (!root.classList.contains('motion-ok') || !('IntersectionObserver' in window)) return () => {};

  const fold = window.innerHeight * LINE;
  const waiting = [];
  for (const el of document.querySelectorAll(SELECTOR)) {
    if (el.getBoundingClientRect().top < fold) el.setAttribute('data-in', '');
    else waiting.push(el);
  }
  root.classList.add('reveals');

  const observer = new IntersectionObserver(
    (entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.style.setProperty('--reveal-delay', `${Math.min(order * STAGGER_MS, MAX_DELAY_MS)}ms`);
        el.setAttribute('data-in', '');
        observer.unobserve(el);
        order += 1;
      }
    },
    { rootMargin: `0px 0px -${Math.round((1 - LINE) * 100)}% 0px` }
  );
  waiting.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
